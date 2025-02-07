
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Auth } from "./Auth";

/**
 * Entry point for the React application.
 * Sets up the root React component and handles authentication callbacks.
 */

const container = document.getElementById("root");
const root = createRoot(container!);

const redirectUrl = new URL(process.env.IMJS_AUTH_CLIENT_REDIRECT_URI || "");
if (redirectUrl.pathname === window.location.pathname) {
  Auth.handleSigninCallback().catch(console.error);
}
else
{
  root.render(<App />);
}

