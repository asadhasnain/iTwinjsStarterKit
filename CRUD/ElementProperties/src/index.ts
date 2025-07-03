/**
 * @file index.ts
 * @description This file initializes the iModelHost, downloads a briefcase, processes its elements, and releases the briefcase.
 * It uses environment variables for configuration and performs authentication using NodeCliAuthorizationClient.
 */

import { BriefcaseDb, BriefcaseManager, IModelHost, KnownLocations } from "@itwin/core-backend";
import { ECSqlReader, RequestNewBriefcaseProps } from "@itwin/core-common";
import { BackendIModelsAccess } from "@itwin/imodels-access-backend";
import { NodeCliAuthorizationClient } from "@itwin/node-cli-authorization";
import * as dotenv from "dotenv";
import path from "path";
import { initializeLogging } from "./Loggers/BackendLogger";

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
const downloadAndProcessBriefcase = async (): Promise<BriefcaseDb> => {
  const requestNewBriefcaseProps: RequestNewBriefcaseProps = {
    iTwinId,
    iModelId,
  };

  const localBriefcaseProps = await BriefcaseManager.downloadBriefcase(requestNewBriefcaseProps);
  const briefcaseDb = await BriefcaseDb.open({ fileName: localBriefcaseProps.fileName, readonly: true });

  return briefcaseDb;
};

const readElements = async (briefcaseDb: BriefcaseDb): Promise<void> => {
  // This function is implemented to query elements and read its properties from the briefcaseDb.

  const query = `SELECT ECInstanceId from BisCore.Element`; 

  const ecSqlReader: ECSqlReader =  briefcaseDb.createQueryReader(query);

  while (await ecSqlReader.step()) {
    const elementProps = briefcaseDb.elements.getElementProps(ecSqlReader.current.ECInstanceId); // Get properties of the current element
    
    console.log(`Elements ${ecSqlReader.current.ECInstanceId}: ${JSON.stringify(elementProps, null, 2)}`);
  }

}

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

    initializeLogging(process.env.LOG_LEVEL);
    await startupIModelHost();
    const briefcaseDb = await downloadAndProcessBriefcase();

    await readElements(briefcaseDb);

    // Close the briefcase and release it
    briefcaseDb.close();
    await BriefcaseManager.releaseBriefcase(accessToken, {iModelId: briefcaseDb.iModelId, briefcaseId: briefcaseDb.briefcaseId});

    await authClient.signOut(); // Sign out of iTwin.js
  } catch (error) {
    console.error("Error during execution:", error);
  }
})();