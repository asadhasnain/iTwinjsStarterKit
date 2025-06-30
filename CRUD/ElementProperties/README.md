# Retrieve Element Properties using ECSqlReader

This sample explains how to element properties from iModel.

## Register Client

1. Choose "Native" as your application type when [registering for use with this client](https://developer.bentley.com/register/).

    ![alt text](RegisterApplication.png)

2. After the application is registered, you will get the clientId. Copy it.

3. Place the ClientId, iTwinId and iModelId in .env file

        CLIENT_ID=[Add your clientId here]

        ITWIN_ID=[Set your iTwin id]
        IMODEL_ID=[Set your iModel id]

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

1. [App Backend Development](https://www.itwinjs.org/learning/backend/)
2. [Briefcase Manager](https://www.itwinjs.org/reference/core-backend/imodels/briefcasemanager/)
3. [iModelHub Access Backend](https://github.com/iTwin/imodels-clients/tree/main/itwin-platform-access/imodels-access-backend)
4. [ECSqlReader](https://www.itwinjs.org/reference/core-common/imodels/ecsqlreader/)
5. [getElementProps](https://www.itwinjs.org/reference/core-backend/imodels/imodeldb/imodeldb.elements/#getelementprops)
g. [tryGetElementProps](https://www.itwinjs.org/reference/core-backend/imodels/imodeldb/imodeldb.elements/trygetelementprops/)