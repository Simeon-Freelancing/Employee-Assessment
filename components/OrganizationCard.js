import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../styles/theme';
import Button from './ui/Button';

export default function OrganizationCard({ org, onEdit, onStartAssessment, onViewReport }) {
	const assessments = org.assessments || [];
	const latest = assessments.length > 0 ? assessments[0] : null;

	return (
			<View style={styles.card}>
				<View style={styles.leftAccent} />
				<View style={styles.content}>
				<View style={styles.rowTop}>
					<Text style={styles.name}>{org.name}</Text>
					<Text style={styles.meta}>ID: {org.id}</Text>
				</View>

				<View style={styles.rowMeta}>
					<Text style={styles.small}>Onboarded: {new Date(org.createdAt).toLocaleDateString()}</Text>
					<Text style={styles.small}>{assessments.length} assessments</Text>
				</View>

				{latest ? (
					<View style={styles.latest}>
						<View>
							<Text style={styles.sectionTitle}>Latest</Text>
							<Text style={styles.latestText}>
								{new Date(latest.takenAt).toLocaleDateString()} — {latest.status}
							</Text>
							{latest.reportSummary && <Text style={styles.snippet}>{latest.reportSummary}</Text>}
						</View>
						<View style={styles.scoreWrap}>
							<Text style={styles.scoreLabel}>Score</Text>
							<Text style={styles.scoreValue}>{latest.score != null ? `${latest.score}%` : '—'}</Text>
						</View>
					</View>
				) : (
					<View style={styles.noAssess}>
						<Text style={styles.noAssessText}>No assessments yet</Text>
					</View>
				)}

							<View style={styles.actions}>
								<Button variant="ghost" style={styles.actionBtn} onPress={() => onEdit(org)}>Edit</Button>
								<Button style={[styles.actionBtnPrimary]} onPress={() => onStartAssessment(org)}>View Organization</Button>
								<Button variant="ghost" style={styles.actionBtn} onPress={() => onViewReport(org)}>Reports</Button>
							</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		backgroundColor: Theme.COLORS.surface,
		borderRadius: Theme.SIZES.cardRadius,
		padding: Theme.SIZES.md,
		marginVertical: Theme.SIZES.md,
		...Theme.SHADOW.subtle,
		overflow: 'hidden',
	},
	leftAccent: {
		width: 6,
		backgroundColor: Theme.COLORS.primary,
		borderTopLeftRadius: Theme.SIZES.cardRadius,
		borderBottomLeftRadius: Theme.SIZES.cardRadius,
	},
	content: {
		flex: 1,
		paddingHorizontal: Theme.SIZES.md,
	},
	rowTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	name: {
		fontSize: Theme.TYPOGRAPHY.h3,
		fontWeight: Theme.TYPOGRAPHY.weight.bold,
		color: Theme.COLORS.navy,
	},
	meta: {
		fontSize: Theme.TYPOGRAPHY.small,
		color: Theme.COLORS.muted,
	},
	rowMeta: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 12,
		marginTop: Theme.SIZES.sm,
	},
	small: {
		color: Theme.COLORS.muted,
		fontSize: Theme.TYPOGRAPHY.small,
		marginRight: Theme.SIZES.sm,
	},
	sectionTitle: {
		fontSize: Theme.TYPOGRAPHY.small,
		fontWeight: Theme.TYPOGRAPHY.weight.bold,
		color: Theme.COLORS.navy,
	},
	latest: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: Theme.SIZES.sm,
	},
	latestText: {
		color: Theme.COLORS.subtext,
		marginTop: Theme.SIZES.xs,
	},
	snippet: {
		color: Theme.COLORS.muted,
		marginTop: Theme.SIZES.sm,
		fontSize: Theme.TYPOGRAPHY.small,
	},
	scoreWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: Theme.SIZES.md,
	},
	scoreLabel: {
		fontSize: Theme.TYPOGRAPHY.small,
		color: Theme.COLORS.muted,
	},
	scoreValue: {
		marginTop: Theme.SIZES.xs,
		fontSize: 18,
		fontWeight: Theme.TYPOGRAPHY.weight.bold,
		color: Theme.COLORS.primary,
	},
	noAssess: {
		marginTop: Theme.SIZES.sm,
	},
	noAssessText: {
		color: Theme.COLORS.muted,
		fontStyle: 'italic',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: Theme.SIZES.md,
	},
	actionBtn: {
		marginRight: Theme.SIZES.sm,
	},
	actionBtnPrimary: {
		backgroundColor: Theme.COLORS.primary,
	},
});
