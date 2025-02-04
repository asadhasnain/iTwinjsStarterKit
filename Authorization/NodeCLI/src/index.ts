import { NodeCliAuthorizationClient } from "@itwin/node-cli-authorization";

const authClient = new NodeCliAuthorizationClient({clientId: "[Add Client Id Here]", scope: "itwin-platform"});

 (async() => {

    console.log("Starting to Sign In");

    await authClient.signIn();  // Sign in to iTwin.js

    console.log("Access Token: ", await authClient.getAccessToken());

    await authClient.signOut(); // Sign out of iTwin.js
})();
