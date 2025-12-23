import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import QuestionCard from "../../../components/QuestionCard";
import { QUESTIONS } from "../../../data/questions";
import { DOMAINS } from "../../../data/domains";
import { getResponses, createResponse, updateResponse } from "../../../lib/api";
import { useAssessment } from "../../../contexts/AssessmentContext";
import Theme from '../../../styles/theme';
import Button from '../../../components/ui/Button';
import Typography from '../../../components/ui/Typography';
import { HeaderBackButton } from "@react-navigation/elements";

export default function DomainAssessment() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const domainIdRaw = params?.domainId;
  const domainIndex = Number(domainIdRaw); // numeric domain index
  const assessmentId = params?.assessmentId;
  const orgId = params?.orgId ? Number(params.orgId) : null;
  const domain = DOMAINS.find((d) => d.id === domainIndex);

  const handleGoBackToDashboard = () => {
    // 1. Use replace to remove the current assessment screen from the stack.
    // 2. Specify the dashboard path and pass the required orgId parameter.
    //    Using router.replace effectively resets the stack back to the dashboard.
    router.replace({
      pathname: "/dashboard",
      params: { orgId: orgId },
    });
  };

  const { responses, comments, updateResponse, updateComment } =
    useAssessment();

  const [loadingSave, setLoadingSave] = useState(false);

  // Load persisted responses for this assessment into context (one-time / when assessmentId changes)
  useEffect(() => {
    const load = async () => {
      if (!assessmentId) return;
      try {
        const { data } = await getResponses(assessmentId);
        if (data && Array.isArray(data)) {
          // populate context responses/comments
          data.forEach((r) => {
            // r.question_id and r.score expected
            // We need domain_id from the response object to scope it correctly
            if (r.question_id != null && r.domain_id != null) {
              updateResponse(r.domain_id, r.question_id, r.score != null ? r.score : null);
            }
            if (r.question_id != null && r.comments != null && r.domain_id != null) {
              updateComment(r.domain_id, r.question_id, r.comments);
            }
          });
        }
      } catch (err) {
        console.warn("Failed to load responses:", err);
      }
    };
    load();
  }, [assessmentId]);

  // Save (upsert) all responses for this domain
  const handleSaveChanges = async () => {
    if (!assessmentId) {
      Alert.alert("Save failed", "No assessmentId provided.");
      return;
    }
    setLoadingSave(true);
    try {
      const { data: existing = [] } = await getResponses(assessmentId);
      const existingByQuestion = {};
      existing.forEach((r) => {
        existingByQuestion[r.question_id] = r;
      });

      const domainQuestions = QUESTIONS[domainIndex] || [];

      const ops = domainQuestions.map((q) => {
        const qid = q.id;
        const key = `${domainIndex}_${qid}`;
        const score = responses[key] != null ? responses[key] : null;
        const comment = comments[key] || "";
        const existingRow = existingByQuestion[qid];

        if (existingRow) {
          // update existing row
          return updateResponse(existingRow.id, { score, comments: comment });
        } else {
          // create new row
          return createResponse({
            assessment_id: assessmentId,
            question_id: qid,
            domain_id: domainIndex,
            score,
            comments: comment,
          });
        }
      });

      await Promise.all(ops);
      // reload and sync context
      const { data: refreshed = [] } = await getResponses(assessmentId);
      refreshed.forEach((r) => {
        if (r.question_id != null && r.domain_id != null) {
          updateResponse(r.domain_id, r.question_id, r.score != null ? r.score : null);
        }
        if (r.question_id != null && r.comments != null && r.domain_id != null) {
          updateComment(r.domain_id, r.question_id, r.comments);
        }
      });

      Alert.alert("Saved", "Responses saved successfully.");
    } catch (err) {
      console.warn("Save error:", err);
      Alert.alert("Save failed", "An error occurred while saving.");
    } finally {
      setLoadingSave(false);
    }
  };
  // ...existing code...
  const handlePrevDomain = () => {
    const prev = domainIndex - 1;
    if (prev >= 1) {
      router.push({
        pathname: `/assessment/${prev}`,
        params: {
          orgId: orgId,
          assessmentId: assessmentId,
        },
      });
    }
  };

  const handleNextDomain = () => {
    const next = domainIndex + 1;
    if (next <= DOMAINS.length) {
      router.push({
        pathname: `/assessment/${next}`,
        params: {
          orgId: orgId,
          assessmentId: assessmentId,
        },
      });
    } else {
      // If we've reached the end, go back to dashboard
      router.replace({
        pathname: "/dashboard",
        params: { orgId },
      });
    }
  };
  // ...existing code...

  const questions = QUESTIONS[domainIndex] || [];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Assessment", // You can even make this dynamic if you want
          headerShown: true,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor="white"
              // 👇 THIS IS THE KEY CHANGE
              onPress={handleGoBackToDashboard}
            />
          ),
        }}
      />
      <Typography.H2 style={styles.title}>{domain?.name}</Typography.H2>
      <ScrollView style={styles.questionsContainer}>
        {questions.map((question) => {
          const key = `${domainIndex}_${question.id}`;
          return (
            <QuestionCard
              key={question.id}
              question={question}
              currentScore={responses[key]}
              currentComment={comments[key]}
              onScoreChange={(score) => updateResponse(domainIndex, question.id, score)}
              onCommentChange={(text) => updateComment(domainIndex, question.id, text)}
            />
          );
        })}
        <Button style={styles.saveButton} onPress={handleSaveChanges} disabled={loadingSave}>
          {loadingSave ? 'Saving...' : 'Save changes'}
        </Button>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, styles.prevButton]}
          onPress={handlePrevDomain}
          disabled={domainIndex <= 1}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNextDomain}
        >
          <Text style={[styles.navButtonText, styles.nextButtonText]}>
            Next →
          </Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginBottom: SIZES.medium,
  },
  questionsContainer: {
    flex: 1,
    marginBottom: SIZES.medium,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.medium,
    paddingVertical: SIZES.small,
  },
  navButton: {
    flex: 1,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.small,
    marginHorizontal: 6,
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.subtle,
  },
  prevButton: {},
  nextButton: {
    backgroundColor: COLORS.primary,
  },
  navButtonText: {
    fontSize: TYPOGRAPHY.bodyStrong,
    fontWeight: "700",
    color: COLORS.text,
  },
  nextButtonText: {
    color: COLORS.surface,
  },
  saveButton: {
    flex: 1,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.small,
    marginHorizontal: 6,
    alignItems: "center",
    backgroundColor: COLORS.accent,
    ...SHADOW.elevated,
  },
  saveButtonText: {
    color: COLORS.surface,
    fontWeight: "800",
  },
});
