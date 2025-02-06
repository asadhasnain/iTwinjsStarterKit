# Single Page Application (SPA) Authentication and Authorization

This is a very simple starting guide to implement your authorization for a Node-based application.

## Register Client

1. Choose "SPA" as your application type when [registering for use with this client](https://developer.bentley.com/register/).

    ![alt text](RegisterSinglePageApplication.png)

2. After the application is registered, you will get the clientId. Copy it.

3. Environment Variables

    Prior to running the app, you will need to add OIDC client configuration to the variables in the .env file:

        ```
            # ---- Authorization Client Settings ----
            IMJS_AUTH_CLIENT_CLIENT_ID=""
            IMJS_AUTH_CLIENT_REDIRECT_URI=""
            IMJS_AUTH_CLIENT_LOGOUT_URI=""
            IMJS_AUTH_CLIENT_SCOPES=""
        ```

4. Client_ID is used in `index.ts` file creating the **BrowserAuthorizationClient**:

    ```typescript
    const client = new BrowserAuthorizationClient({
                        clientId: // find at developer.bentley.com
                        redirectUri: // find/set at developer.bentley.com
                        scope: // find/set at developer.bentley.com
                        authority: // ims.bentley.com
                        postSignoutRedirectUri: // find/set at developer.bentley.com (see note below)
                        responseType: "code"
                        });
    ```

## Install Dependencies

   ```sh
   npm install
   ```

## Build and Start Project

   ```sh  
   npm build
   npm start
   ```

## References

1. [Authorize Single-Page Application (SPA)](https://developer.bentley.com/tutorials/authorize-spa/)
2. [Auth Clients Browser Based](https://github.com/iTwin/auth-clients/blob/main/packages/browser/README.md)
3. [Browser Authorization Package](https://www.npmjs.com/package/@itwin/browser-authorization)