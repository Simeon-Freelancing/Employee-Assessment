import { supabase } from "./supabase";
export const sendResendOtp = async (email, code) => {
  const RESEND_API_KEY = process.env.EXPO_PUBLIC_RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
      console.warn("Missing EXPO_PUBLIC_RESEND_API_KEY");
      return { success: false, error: new Error("Missing Resend API Key") };
  }

  try {
    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: { email, code }
    });

    if (error) {
        throw new Error(error.message || 'Failed to send email');
    }

    return { success: true };
  } catch (error) {
    console.error("Resend Error:", error);
    return { success: false, error };
  }
}
