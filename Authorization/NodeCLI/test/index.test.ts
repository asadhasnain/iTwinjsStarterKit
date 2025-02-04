import { NodeCliAuthorizationClient } from "@itwin/node-cli-authorization";
import { expect } from "chai";
import { describe, it } from "mocha";
import sinon from "sinon";

describe("NodeCliAuthorizationClient", () => {
  it("should sign in and sign out", async () => {
    const authClient = new NodeCliAuthorizationClient({ clientId: "fake-client-id", scope: "itwin-platform" });
    const signInStub = sinon.stub(authClient, "signIn").resolves();
    const signOutStub = sinon.stub(authClient, "signOut").resolves();
    const getAccessTokenStub = sinon.stub(authClient, "getAccessToken").resolves("fake-access-token");

    await authClient.signIn();
    const accessToken = await authClient.getAccessToken();
    await authClient.signOut();

    expect(signInStub.calledOnce).to.be.true;
    expect(accessToken).to.equal("fake-access-token");
    expect(signOutStub.calledOnce).to.be.true;
  });
});
