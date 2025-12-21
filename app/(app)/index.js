import React, {useEffect} from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useAssessment } from "../../contexts/AssessmentContext";
import { useAuth } from "../../contexts/AuthContext";
import Theme from "../../styles/theme";
import Typography from '../../components/ui/Typography';
import Button from '../../components/ui/Button';

export default function Home() {
  const router = useRouter();
  const { startAssessment } = useAssessment();
  const { logout, isAuthenticated, isLoading } = useAuth(); 

  const handleStartAssessment = () => {
    startAssessment();
    router.push("/details");
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWithLogout}>
        <Typography.H1 style={styles.heroTitle}>Measure Your Employee Future</Typography.H1>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: "https://d64gsuwffb70l.cloudfront.net/68e62841fcfbb0441502bbc7_1759914103380_1a932241.webp",
        }}
        style={styles.heroImage}
      />

      <View style={styles.heroContent}>
        <Typography.P style={styles.heroSubtitle}>
          Comprehensive Employee readiness evaluation across 10 critical domains
        </Typography.P>

        <Button style={styles.ctaButton} onPress={handleStartAssessment}>Take an Assessment</Button>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>What You'll Get</Text>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>📊</Text>
          <Typography.H3 style={styles.featureTitle}>Comprehensive Scoring</Typography.H3>
          <Typography.P style={styles.featureText}>
            100 questions across 10 domains with detailed scoring guidance
          </Typography.P>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🤖</Text>
          <Typography.H3 style={styles.featureTitle}>Employee-Powered Insights</Typography.H3>
          <Typography.P style={styles.featureText}>
            ChatGPT-driven recommendations tailored to your results
          </Typography.P>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>📈</Text>
          <Typography.H3 style={styles.featureTitle}>Actionable Reports</Typography.H3>
          <Typography.P style={styles.featureText}>
            Detailed analysis with short, medium, and long-term action plans
          </Typography.P>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🎯</Text>
          <Typography.H3 style={styles.featureTitle}>Progress Tracking</Typography.H3>
          <Typography.P style={styles.featureText}>
            Monitor improvement over time with historical comparisons
          </Typography.P>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 Employee Readiness Evaluation Platform
        </Text>
      </View>
    </ScrollView>
  );
}

const { COLORS, SIZES, TYPOGRAPHY, SHADOW } = Theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.card,
  },
  headerWithLogout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.large,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.small,
  },
  heroImage: {
    width: "100%",
    height: 200,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },
  logoutButton: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    backgroundColor: COLORS.danger,
    borderRadius: SIZES.small,
  },
  logoutText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: TYPOGRAPHY.body,
  },
  heroContent: {
    padding: SIZES.large,
    alignItems: "center",
  },
  heroSubtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: SIZES.medium,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.small,
    width: "100%",
  ...SHADOW.elevated,
  },
  ctaText: {
    color: COLORS.surface,
    fontSize: TYPOGRAPHY.h6,
    fontWeight: "800",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    width: "100%",
    marginBottom: SIZES.small,
  ...SHADOW.subtle,
  },
  secondaryText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.h6,
    fontWeight: "700",
    textAlign: "center",
  },
  featuresSection: {
    padding: SIZES.large,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  featureCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.medium,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.medium,
  ...SHADOW.subtle,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: SIZES.small,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.h6,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  featureText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    lineHeight: 20,
  },
  footer: {
    padding: SIZES.large,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: COLORS.muted,
  },
});
