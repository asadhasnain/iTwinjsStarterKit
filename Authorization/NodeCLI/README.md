# Node CLI Authorization

This is a very simple starting guide to implement your authorization for a Node-based application.

## Register Client

1. Choose "Native" as your application type when [registering for use with this client](https://developer.bentley.com/register/).

    ![alt text](RegisterApplication.png)

2. After the application is registered, you will get the clientId. Copy it.

3. Place the clientId in .env file

    ```sh
    CLIENT_ID=[Add your clientId here]
    ```

4. Client_ID is used in `index.ts` file creating the **NodeCliAuthorizationClient**:

    ```typescript
    const authClient = new NodeCliAuthorizationClient({clientId, scope: "itwin-platform"});
    ```

    Note: If the `redirectUri` is not specified, it will default to `redirectUri: "http://localhost:3000/signin-callback"`.

    If you have set a different `redirectUri` while registering the application, then specify it in the `redirectUri`:

    ```typescript
    const authClient = new NodeCliAuthorizationClient({clientId, scope: "itwin-platform", redirectUri: "http://localhost:5000/signin-callback"});
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

1. [node-cli-authorization](https://www.itwinjs.org/reference/node-cli-authorization/)
2. [Auth Clients Node CLI](https://github.com/iTwin/auth-clients/blob/main/packages/node-cli/README.md)
3. [Authorize Native](https://developer.bentley.com/tutorials/authorize-native/)