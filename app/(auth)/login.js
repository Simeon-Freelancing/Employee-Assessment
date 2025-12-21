import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import Theme from '../../styles/theme';
import Typography from '../../components/ui/Typography';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Login() {
  const router = useRouter();
  const { requestOtp, authError, clearError, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleLogin = async () => {
    setLocalError('');
    clearError();

    if (!email.trim()) {
      setLocalError('Email is required');
      return;
    }

    setIsLoading(true);
    try {
      const { success, error } = await requestOtp(email);
      
      if (success) {
        // User successfully logged in with password, now navigate to token verification
        router.push('/verify-token');
      } else {
        setLocalError(error?.message || `No such user as ${email}.`);
      }
    } catch (err) {
      setLocalError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const displayError = localError || authError;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Typography.H1 style={styles.title}>Welcome Back</Typography.H1>
        <Typography.P style={styles.subtitle}>
          Sign in to your Employee readiness assessment account
        </Typography.P>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <Input
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        {displayError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{displayError}</Text>
          </View>
        )}

        <Button
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Theme.COLORS.surface} />
          ) : (
            'Continue'
          )}
        </Button>

        <View style={styles.infoBox}>
          <Typography.P style={styles.infoText}>
            After entering your password, you'll receive a one-time verification code via email.
          </Typography.P>
        </View>
      </View>

      <View style={styles.footer}>
        <Typography.P style={styles.footerText}>
          Don't have an account? Contact your administrator.
        </Typography.P>
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
  contentContainer: {
    flexGrow: 1,
    padding: SIZES.large,
  },
  header: {
    marginBottom: SIZES.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primaryDark,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
    marginBottom: SIZES.xl,
  },
  formGroup: {
    marginBottom: SIZES.large,
  },
  label: {
    fontSize: TYPOGRAPHY.label,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  errorBox: {
    backgroundColor: COLORS.danger,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    marginBottom: SIZES.medium,
  },
  errorText: {
    color: COLORS.surface,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.large,
    ...SHADOW.elevated,
  },
  infoBox: {
    backgroundColor: COLORS.surface,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.text,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingTop: SIZES.large,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    textAlign: 'center',
  },
});
