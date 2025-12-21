import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from 'styled-components/native';
import { AssessmentProvider } from '../contexts/AssessmentContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Theme from '../styles/theme';

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/verify-token" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider theme={Theme}>
      <AuthProvider>
        <AssessmentProvider>
          <RootLayoutNav />
        </AssessmentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

