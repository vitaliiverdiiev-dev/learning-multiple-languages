import supabase from "@/shared/config/supabase-client.config";
import { Button } from "@/shared/ui";

export const SignInWithGoogleButton = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return <Button onClick={signInWithGoogle}>Sign in with Google</Button>;
};
