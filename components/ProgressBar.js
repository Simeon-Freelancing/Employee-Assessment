import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../styles/theme';

export default function ProgressBar({ percentage }) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Assessment Progress</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const { COLORS, SIZES, TYPOGRAPHY } = Theme;

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.md,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  label: {
    fontSize: TYPOGRAPHY.small,
    color: COLORS.muted,
    fontWeight: '600',
  },
  percentage: {
    fontSize: TYPOGRAPHY.small,
    color: COLORS.primaryAccent,
    fontWeight: '700',
  },
  barBackground: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 4,
  },
});
