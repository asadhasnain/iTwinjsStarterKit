
import { useCallback, useEffect, useState } from "react";
import { Auth } from "../Auth";

/**
 * Custom hook to handle authentication using the Auth client.
 */ 

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");

  const authClient = Auth.getClient();

  const login = useCallback(async () => {
    try {
      await authClient.signInSilent();
    } catch (error) {
      console.error("Silent sign-in failed", error);
      await authClient.signIn();
    }
    setAccessToken(await authClient.getAccessToken());
  }, [authClient]);

  useEffect(() => {
    void login();
  }, [login]);

  return accessToken;
};