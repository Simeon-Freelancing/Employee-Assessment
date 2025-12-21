import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../styles/theme';
import Typography from './ui/Typography';

export default function InsightCard({ title, content, type = 'info' }) {
  const getIcon = () => {
    switch (type) {
      case 'strength': return '✅';
      case 'weakness': return '⚠️';
      case 'recommendation': return '💡';
      default: return 'ℹ️';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'strength': return Theme.COLORS.success;
      case 'weakness': return Theme.COLORS.danger;
      case 'recommendation': return Theme.COLORS.primaryAccent;
      default: return Theme.COLORS.muted;
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: getColor() }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{getIcon()}</Text>
        <Typography.H3 style={styles.title}>{title}</Typography.H3>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.COLORS.surface,
    borderRadius: Theme.SIZES.cardRadius,
    padding: Theme.SIZES.md,
    marginBottom: Theme.SIZES.md,
    borderLeftWidth: 4,
    ...Theme.SHADOW.subtle,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    flex: 1,
  },
  content: {
    fontSize: 14,
    color: Theme.COLORS.muted,
    lineHeight: 20,
  },
});
