
import React from "react";
import { useAuth } from "./hooks/useAuth";
import IModelDetails from "./IModelDetails";

/**
 * The main application component.
 * 
 * This component uses the `useAuth` hook to retrieve an access token and displays it if available.
 * 
 * @component
 * @returns {React.FC} The App component.
 */

export const App: React.FC = () => {
  const accessToken = useAuth();

  return (
    <>{accessToken && <IModelDetails />}</>
  );
};

