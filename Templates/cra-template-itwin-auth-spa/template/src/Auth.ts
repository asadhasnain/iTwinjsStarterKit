import { BrowserAuthorizationClient } from "@itwin/browser-authorization";


const clientId = process.env.IMJS_AUTH_CLIENT_CLIENT_ID || "";
const redirectUri = process.env.IMJS_AUTH_CLIENT_REDIRECT_URI || "";
const scope = process.env.IMJS_AUTH_CLIENT_SCOPES || "itwin-platform";
const authority = process.env.IMJS_AUTH_AUTHORITY || "https://ims.bentley.com";

/**
 * The `Auth` class provides methods to manage authentication using the `BrowserAuthorizationClient`.
 * It includes methods to get the client instance and handle the sign-in callback.
 */
export class Auth {
  /**
   * The `BrowserAuthorizationClient` instance used for authentication.
   * This is a static property, so it is shared across all instances of the `Auth` class.
   */
  private static client: BrowserAuthorizationClient;

  /**
   * Retrieves the `BrowserAuthorizationClient` instance.
   * If the client does not already exist, it initializes a new instance with the provided configuration.
   * 
   * @returns The `BrowserAuthorizationClient` instance.
   */
  public static getClient() {
    if (!this.client) {
      this.client = new BrowserAuthorizationClient({
        clientId,
        redirectUri,
        scope,
        responseType: "code",
        authority
      });
    }
    return this.client;
  }

  /**
   * Handles the sign-in callback by invoking the `handleSigninCallback` method on the `BrowserAuthorizationClient` instance.
   * This method should be called after the user is redirected back to the application following authentication.
   * 
   * @returns A promise that resolves when the sign-in callback handling is complete.
   */
  public static async handleSigninCallback(): Promise<void> {
    this.getClient().handleSigninCallback();
  }
}