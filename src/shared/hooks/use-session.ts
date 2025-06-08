import { useEffect, useState } from "react";
import { type Session } from "@supabase/supabase-js";
import supabase from "../config/supabase-client.config";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to get session:", error);
        setSession(null);
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
};
