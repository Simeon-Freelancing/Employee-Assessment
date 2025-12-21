import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import ModalSelector from "react-native-modal-selector";
import { getOrganizationNames, getOrganization, createOrganization } from "../../lib/api";
import Theme from '../../styles/theme';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Typography from '../../components/ui/Typography';

export default function Details() {
  const router = useRouter();
  const [showOrgList, setShowOrgList] = useState(false);
  const [showNewOrgForm, setShowNewOrgForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    description: "",
    employeeSize: "",
    goals: ""
  });
  const [orgList, setOrgList] = useState([]);
  const [loadingOrgs, setLoadingOrgs] = useState(false);
  const [selectedOrgDetails, setSelectedOrgDetails] = useState(null);

  const industries = ["Technology", "Healthcare", "Finance", "Manufacturing", "Other"];
  const employeeSizes = ["1-10", "11-50", "51-200", "201-500", "500+"];
  const goals = ["Digital Transformation", "Process Automation", "Data Analytics", "Customer Experience", "Other"];

  // Fetch organization names when modal opens
  const handleShowOrgList = async () => {
    setLoadingOrgs(true);
    const { data, error } = await getOrganizationNames();
    setOrgList(data || []);
    setLoadingOrgs(false);
    setShowOrgList(true);
  };

  // Fetch organization details when selected
  const handleSelectOrg = async (org) => {
    setSelectedOrg(org); // for modal visibility
    const { data, error } = await getOrganization(org.id);
    setSelectedOrgDetails(data || org);
  };

  const handleCreateOrg = async () => {
    try {
      const { data, error } = await createOrganization(formData);
      if (error) {
        throw error;
      }
      // success
      alert("Organization created successfully!");
      setShowNewOrgForm(false);
      setShowOrgList(true);
      // optional: clear form
      setFormData({
        name: "",
        email: "",
        industry: "",
        description: "",
        employeeSize: "",
        goals: "",
      });
    } catch (error) {
      alert("Error creating organization: " + (error.message || String(error)));
      // keep the user on the create form so they can retry or go back
    }
  };

  const handleContinueToDashboard = () => {
    // close UI state first
    setSelectedOrg(null);
    setSelectedOrgDetails(null);
    setShowOrgList(false);
    // navigate to dashboard with orgId as query param so dashboard can load persisted assessment
    const id = selectedOrgDetails?.id ?? selectedOrg?.id;
    if (id) {
      router.push(`/dashboard?orgId=${id}`);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <View style={styles.container}>
      <Typography.H1 style={styles.title}>Choose Organization</Typography.H1>
      <Button style={styles.optionButton} onPress={handleShowOrgList}>Select Existing Organization</Button>
      <Button style={styles.optionButton} onPress={() => setShowNewOrgForm(true)}>Create New Organization</Button>

      {/* Organization List Modal */}
      <Modal visible={showOrgList} animationType="slide">
        <View style={styles.modalContainer}>
          <Input
            style={styles.searchInput}
            placeholder="Search organizations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {loadingOrgs ? (
            <Text>Loading...</Text>
          ) : (
            <ScrollView style={styles.orgList}>
              {orgList
                .filter((org) =>
                  org.name?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((org) => (
                  <Button variant="ghost" key={org.id} style={styles.orgItem} onPress={() => handleSelectOrg(org)}>
                    {org.name}
                  </Button>
                ))}
            </ScrollView>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowOrgList(false)}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Organization Details Modal */}
      <Modal visible={!!selectedOrg} animationType="slide">
        <View style={styles.modalContainer}>
          <Typography.H2 style={styles.modalTitle}>{selectedOrgDetails?.name}</Typography.H2>
          <Text style={styles.detailText}>
            Industry: {selectedOrgDetails?.industry}
          </Text>
          <Text style={styles.detailText}>
            Email: {selectedOrgDetails?.email}
          </Text>
          <Text style={styles.detailText}>
            Employee Size: {selectedOrgDetails?.employeeSize}
          </Text>
          <Text style={styles.detailText}>
            Goals: {selectedOrgDetails?.goals}
          </Text>
          <Text style={styles.detailText}>
            Description: {selectedOrgDetails?.description}
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueToDashboard}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSelectedOrg(null);
              setSelectedOrgDetails(null);
            }}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* New Organization Form Modal */}
      <Modal visible={showNewOrgForm} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Organization</Text>

          <Input style={styles.input} placeholder="Organization Name" value={formData.name} onChangeText={(text) => setFormData({ ...formData, name: text })} />

          <Input style={styles.input} placeholder="Email" value={formData.email} onChangeText={(text) => setFormData({ ...formData, email: text })} />

          <ModalSelector
            data={industries.map((item, index) => ({
              key: index,
              label: item,
            }))}
            initValue={formData.industry || "Select Industry"}
            onChange={(option) =>
              setFormData({ ...formData, industry: option.label })
            }
          >
            <View style={styles.selector}>
              <Text style={styles.selectorText}>
                {formData.industry || "Select Industry"}
              </Text>
              <Text style={styles.selectorArrow}>▾</Text>
            </View>
          </ModalSelector>

          <Input style={[styles.input, styles.textArea]} placeholder="Brief Description" multiline value={formData.description} onChangeText={(text) => setFormData({ ...formData, description: text })} />

          <ModalSelector
            data={employeeSizes.map((item, index) => ({
              key: index,
              label: item,
            }))}
            initValue={formData.employeeSize || "Select Employee Size"}
            onChange={(option) =>
              setFormData({ ...formData, employeeSize: option.label })
            }
          >
            <View style={styles.selector}>
              <Text style={styles.selectorText}>
                {formData.employeeSize || "Select Employee Size"}
              </Text>
              <Text style={styles.selectorArrow}>▾</Text>
            </View>
          </ModalSelector>

          <ModalSelector
            data={goals.map((item, index) => ({ key: index, label: item }))}
            initValue={formData.goals || "Select Primary Goal"}
            onChange={(option) =>
              setFormData({ ...formData, goals: option.label })
            }
          >
            <View style={styles.selector}>
              <Text style={styles.selectorText}>
                {formData.goals || "Select Primary Goal"}
              </Text>
              <Text style={styles.selectorArrow}>▾</Text>
            </View>
          </ModalSelector>

          <Button style={styles.submitButton} onPress={handleCreateOrg}>Create Organization</Button>

          <Button variant="ghost" style={styles.closeButton} onPress={() => setShowNewOrgForm(false)}>Go Back</Button>
        </ScrollView>
      </Modal>
    </View>
  );
}

const { COLORS, SIZES, TYPOGRAPHY, SHADOW } = Theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.large,
    backgroundColor: COLORS.card,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginBottom: SIZES.large,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
    ...SHADOW.elevated,
  },
  optionText: {
    color: COLORS.surface,
    fontSize: TYPOGRAPHY.h6,
    fontWeight: "700",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    padding: SIZES.large,
    backgroundColor: COLORS.surface,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: SIZES.medium,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
  },
  orgList: {
    flex: 1,
  },
  orgItem: {
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orgName: {
    fontSize: TYPOGRAPHY.h6,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
    ...SHADOW.elevated,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
  },
  closeButton: {
    backgroundColor: COLORS.muted,
    padding: SIZES.small,
    borderRadius: SIZES.small,
  },
  buttonText: {
    color: COLORS.surface,
    textAlign: "center",
    fontSize: TYPOGRAPHY.bodyStrong,
    fontWeight: "700",
  },
  detailText: {
    fontSize: TYPOGRAPHY.body,
    marginBottom: SIZES.small,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
    backgroundColor: COLORS.surface,
  },
  selectorText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
  },
  selectorArrow: {
    color: COLORS.muted,
    fontSize: 18,
    marginLeft: 10,
  },
});

