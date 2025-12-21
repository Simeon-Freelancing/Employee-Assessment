import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../styles/theme';
import Typography from './ui/Typography';

export default function DomainCard({ domain, score, onPress }) {
  const getScoreColor = (s) => {
    if (s >= 4.1) return Theme.COLORS.success;
    if (s >= 3.1) return Theme.COLORS.primaryAccent;
    if (s >= 2.1) return Theme.COLORS.accent;
    if (s > 0) return Theme.COLORS.danger;
    return Theme.COLORS.border;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Image source={{ uri: domain.icon }} style={styles.icon} />
      </View>
      <View style={styles.content}>
        <Typography.H2 style={styles.name}>{domain.name}</Typography.H2>
        <Text style={styles.description} numberOfLines={2}>{domain.description}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={[styles.score, { color: getScoreColor(score) }]}>
          {score > 0 ? score.toFixed(1) : '-'}
        </Text>
        <Text style={styles.maxScore}>/ 10.0</Text>
      </View>
    </TouchableOpacity>
  );
}

const { COLORS, SIZES, TYPOGRAPHY, SHADOW } = Theme;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW.subtle,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  icon: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
  },
  name: {
    // Typography.H2 handles font size/weight but keep color override/spacings here
    color: COLORS.navy,
    marginBottom: 4,
  },
  description: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.navy,
  },
  maxScore: {
    fontSize: 12,
    color: COLORS.muted,
  },
});
