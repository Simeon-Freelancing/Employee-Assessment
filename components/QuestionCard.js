import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../styles/theme';

export default function QuestionCard({ question, currentScore, onScoreChange }) {
  const [showGuidance, setShowGuidance] = useState(false);
  
  const scores = [1,2,3,4,5,6,7,8,9,10];

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question.text}</Text>

      <View style={styles.scoresContainer}>
        {scores.map((score) => (
          <TouchableOpacity
            key={score}
            style={[
              styles.scoreButton,
              currentScore === score && styles.scoreButtonActive,
            ]}
            onPress={() => onScoreChange(score)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.scoreText,
                currentScore === score && styles.scoreTextActive,
              ]}
            >
              {score}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => setShowGuidance(!showGuidance)}
        style={styles.guidanceButton}
        activeOpacity={0.8}
      >
        <Text style={styles.guidanceButtonText}>
          {showGuidance ? "▼ Hide Guidance" : "▶ Show Scoring Guidance"}
        </Text>
      </TouchableOpacity>

      {showGuidance && (
        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceText}>
            1-2: Non-existent | 3-4: Foundational | 5-6: Standardized | 7-8:
            Managed/Quantified | 9-10: Fully integrated
          </Text>
        </View>
      )}
    </View>
  );
}

const { COLORS, SIZES, TYPOGRAPHY, SHADOW } = Theme;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.md,
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.subtle,
  },
  questionText: {
    fontSize: TYPOGRAPHY.h3,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.text,
    marginBottom: SIZES.sm,
    lineHeight: 24,
  },
  scoresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.medium,
    flexWrap: "wrap",
  },
  scoreButton: {
    width: SIZES.scoreButton,
    height: SIZES.scoreButton,
    borderRadius: SIZES.scoreButton / 2,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 10,
    marginBottom: 10,
    ...SHADOW.elevated,
  },
  scoreButtonActive: {
    backgroundColor: COLORS.primaryAccent,
    borderColor: COLORS.primary,
    transform: [{ scale: 1.02 }],
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.muted,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  scoreTextActive: {
    color: '#fff',
  },
  guidanceButton: {
    paddingVertical: 6,
  },
  guidanceButtonText: {
    fontSize: TYPOGRAPHY.small,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  guidanceContainer: {
    marginTop: 12,
    padding: 14,
    backgroundColor: COLORS.guidanceBg,
    borderRadius: SIZES.small,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  guidanceText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.subtext,
    lineHeight: 20,
  },
});
