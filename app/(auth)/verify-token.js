import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import Theme from '../../styles/theme';
import Typography from '../../components/ui/Typography';
import Button from '../../components/ui/Button';

export default function VerifyToken() {
  const router = useRouter();
  const { requestOtp, verifyOtp, pendingEmail, authError, clearError } = useAuth();

  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const tokenInputRef = useRef(null);

  // Focus on token input when screen loads
  useEffect(() => {
    if (tokenInputRef.current) {
      tokenInputRef.current.focus();
    }
  }, []);

  // Handle resend cooldown
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendCooldown]);

  useEffect(() => {
    if (!pendingEmail) router.replace("/login");
  }, [pendingEmail]);

  if (!pendingEmail) return null;


  const handleVerifyOtp = async () => {
    setLocalError('');
    clearError();

    if (!token.trim()) {
      setLocalError('Verification code is required');
      return;
    }

    setIsLoading(true);
    try {
      const { success, error } = await verifyOtp(token);

      if (success) {
        // Token verified, navigate to home
        router.replace('/');
      } else {
        setLocalError(error?.message || 'Token verification failed');
      }
    } catch (err) {
      setLocalError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendToken = async () => {
    // TODO: Implement resend email with new token
    setResendCooldown(60);
    await requestOtp(pendingEmail);
  };

  const handleTokenChange = (text) => {
    // Only allow digits, max 6 characters
    const cleaned = text.replace(/\D/g, '').slice(0, 6);
    setToken(cleaned);
  };

  const displayError = localError || authError;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Typography.H1 style={styles.title}>Verify Your Email</Typography.H1>
        <Typography.P style={styles.subtitle}>
          We've sent a 6-digit code to {'\n'}
          <Text style={styles.email}>{pendingEmail}</Text>
        </Typography.P>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.tokenInputContainer}>
          <Text style={styles.label}>Verification Code</Text>
          <TextInput
            ref={tokenInputRef}
            style={[styles.tokenInput, displayError && styles.tokenInputError]}
            placeholder="000000"
            value={token}
            onChangeText={handleTokenChange}
            keyboardType="number-pad"
            maxLength={6}
            editable={!isLoading}
            placeholderTextColor={Theme.COLORS.border}
          />
          <Text style={styles.tokenHint}>
            Enter the 6-digit code sent to your email
          </Text>
        </View>

        {displayError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{displayError}</Text>
          </View>
        )}

        <Button
          style={styles.verifyButton}
          onPress={handleVerifyOtp}
          disabled={isLoading || token.length < 6}
        >
          {isLoading ? (
            <ActivityIndicator color={Theme.COLORS.surface} />
          ) : (
            'Verify'
          )}
        </Button>

        <View style={styles.resendContainer}>
          <Typography.P style={styles.resendText}>
            Didn't receive the code?
          </Typography.P>
          <Button
            style={[
              styles.resendButton,
              resendCooldown > 0 && styles.resendButtonDisabled,
            ]}
            onPress={handleResendToken}
            disabled={resendCooldown > 0}
          >
            <Text
              style={[
                styles.resendButtonText,
                resendCooldown > 0 && styles.resendButtonTextDisabled,
              ]}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
            </Text>
          </Button>
        </View>

        <View style={styles.infoBox}>
          <Typography.P style={styles.infoText}>
            This verification code will expire in 15 minutes. After that, you'll need to log in again.
          </Typography.P>
        </View>
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
    marginBottom: SIZES.medium,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
  email: {
    fontWeight: '700',
    color: COLORS.text,
  },
  formContainer: {
    flex: 1,
    marginBottom: SIZES.xl,
  },
  tokenInputContainer: {
    marginBottom: SIZES.large,
  },
  label: {
    fontSize: TYPOGRAPHY.label,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  tokenInput: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 12,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.large,
    paddingHorizontal: SIZES.medium,
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  tokenInputError: {
    borderColor: COLORS.danger,
  },
  tokenHint: {
    fontSize: TYPOGRAPHY.small,
    color: COLORS.muted,
    textAlign: 'center',
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
  verifyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.large,
    ...SHADOW.elevated,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: SIZES.large,
    paddingVertical: SIZES.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resendText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    marginBottom: SIZES.small,
  },
  resendButton: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },
  resendButtonTextDisabled: {
    color: COLORS.muted,
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
});
