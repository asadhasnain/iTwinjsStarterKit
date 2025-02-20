/**
 * @file index.ts
 * @description This file initializes the iModelHost, downloads a briefcase, processes its elements, and releases the briefcase.
 * It uses environment variables for configuration and performs authentication using NodeCliAuthorizationClient.
 */

import { BriefcaseDb, BriefcaseManager, IModelHost, KnownLocations } from "@itwin/core-backend";
import { Logger } from "@itwin/core-bentley";
import { RequestNewBriefcaseProps } from "@itwin/core-common";
import { BackendIModelsAccess } from "@itwin/imodels-access-backend";
import { NodeCliAuthorizationClient } from "@itwin/node-cli-authorization";
import * as dotenv from "dotenv";
import path from "path";
import { initializeLogging } from "./BackendLogger";

// Load environment variables from .env file
dotenv.config();

const clientId = process.env.CLIENT_ID || "";
const iTwinId = process.env.ITWIN_ID || "";
const iModelId = process.env.IMODEL_ID || "";

if (!clientId || !iTwinId || !iModelId) {
  throw new Error("Must specify a valid configuration with CLIENT_ID, ITWIN_ID, and IMODEL_ID");
}

const authClient = new NodeCliAuthorizationClient({ clientId, scope: "itwin-platform" });
let accessToken: string = "";

/**
 * Initializes the iModelHost with the specified cache directory and authorization client.
 * @async
 * @function startupIModelHost
 * @returns {Promise<void>}
 */
const startupIModelHost = async (): Promise<void> => {
  let cacheDir = process.env.MY_SERVICE_CACHE_DIR;
  if (!cacheDir) {
    const tempDir = process.env.MY_SERVICE_TMP_DIR || KnownLocations.tmpdir;
    cacheDir = path.join(tempDir, "iModelJs_cache");
  }

  await IModelHost.startup({ cacheDir, authorizationClient: authClient, hubAccess: new BackendIModelsAccess() });
};

/**
 * Downloads a briefcase, processes its elements, and releases the briefcase.
 * @async
 * @function downloadAndProcessBriefcase
 * @returns {Promise<void>}
 */
const downloadAndProcessBriefcase = async (): Promise<void> => {
  const requestNewBriefcaseProps: RequestNewBriefcaseProps = {
    iTwinId: iTwinId, 
    iModelId: iModelId,
  };

  const localBriefcaseProps = await BriefcaseManager.downloadBriefcase(requestNewBriefcaseProps);
  const briefcaseDb = await BriefcaseDb.open({ fileName: localBriefcaseProps.fileName, readonly: true });

  Logger.logInfo("Connections.Checkpoint", `Opened Briefcase Id: ${briefcaseDb.briefcaseId}`);

  const idSet = briefcaseDb.queryEntityIds({ from: "ProcessFunctional.Equipment" });

  idSet.forEach(id => {
    const element = briefcaseDb.elements.getElement(id);
    Logger.logInfo("Connections.Checkpoint", `Element Id: ${element.id}, Code: ${element.code.value!}`);
  });

  briefcaseDb.close();
  await BriefcaseManager.releaseBriefcase(accessToken, localBriefcaseProps);
};

/**
 * Main function to execute the process of signing in, initializing logging, starting up iModelHost,
 * downloading and processing the briefcase, and signing out.
 * @async
 * @function main
 * @returns {Promise<void>}
 */
(async (): Promise<void> => {
  try {
    console.log("Starting browser based sign in...");

    await authClient.signIn();  // Sign in to iTwin.js
    accessToken = await authClient.getAccessToken();

    await initializeLogging();
    await startupIModelHost();
    await downloadAndProcessBriefcase();

    await authClient.signOut(); // Sign out of iTwin.js
  } catch (error) {
    console.error("Error during execution:", error);
  }
})();