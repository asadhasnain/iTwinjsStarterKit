/**
 * @file index.ts
 * @description This file initializes the iModelHost, downloads a briefcase, processes its elements, and releases the briefcase.
 * It uses environment variables for configuration and performs authentication using NodeCliAuthorizationClient.
 */

import { BriefcaseDb, BriefcaseManager, ECSqlStatement, IModelHost, KnownLocations } from "@itwin/core-backend";
import { DbResult, Id64String, Logger } from "@itwin/core-bentley";
import { PhysicalElementProps, RequestNewBriefcaseProps } from "@itwin/core-common";
import { BackendIModelsAccess } from "@itwin/imodels-access-backend";
import { NodeCliAuthorizationClient } from "@itwin/node-cli-authorization";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { initializeLogging } from "./Loggers/BackendLogger";
import { ITransformer } from "./Transformers/ITransformer";
import { PcfTransformer } from "./Transformers/PcfTransformer";
import { readECToPCFMapping } from "./Mappings/ReadECtoPCFMapping";
import { IRelationshipTransformer } from "./Transformers/IRelationshipTransformer";
import { RelationshipTransformer } from "./Transformers/RelationshipTransformer";

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

const writePCFFile = (filename: string, content: string): void => {
  fs.writeFileSync(filename, content);
  console.log(`PCF file generated successfully: ${filename}`);
};

// Function to get target instance ID
function getTargetInstance(briefcaseDb: BriefcaseDb, relationshipName: string, sourceECInstanceId: Id64String): Id64String[] {

  const query = `SELECT TargetECInstanceId FROM ${relationshipName} WHERE SourceECInstanceId = ${sourceECInstanceId}`;
  const targetIds: Id64String[] = [];


  briefcaseDb.withPreparedStatement(query, (stmt: ECSqlStatement) => {
  
    while (stmt.step() === DbResult.BE_SQLITE_ROW) {
      const row: any = stmt.getRow();
      targetIds.push(row.targetId);
    }
  });
  return targetIds; // No relation found
}


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

  Logger.logInfo("Backend.BriefcaseManager", `Opened Briefcase Id: ${briefcaseDb.briefcaseId}`);

  const ecToPcfMapping = readECToPCFMapping();

  let pcfContent = `ISOGEN-FILES\nUNITS-BORE INCHES\nUNITS-CO-ORDS MM\nUNITS-BOLT-LENGTH MM\nUNITS-WEIGHT KG\n`;


  ecToPcfMapping.ECClass.forEach((ecClass) => {
    // Logger.logInfo("Backend.BriefcaseManager", `EC Class: ${ecClass.typeName}, PCF Name: ${ecClass.pcfName}`); 
    
    const idSet = briefcaseDb.queryEntityIds({ from: `${ecClass.typeName}`});

    const transformer: ITransformer = new PcfTransformer();
    const relationshipTransformer: IRelationshipTransformer = new RelationshipTransformer();

    for (const id of idSet) {
      const element = briefcaseDb.elements.getElement(id);

      const elementProps = briefcaseDb.elements.getElementProps<PhysicalElementProps>({id: element.id, wantGeometry: false});

      pcfContent += transformer.transform(ecClass, elementProps);

      if(ecClass.Relationship) {
          const targetIds: Id64String[] = getTargetInstance(briefcaseDb, ecClass.Relationship.relationshipName, element.id);

          Logger.logTrace("Backend.BriefcaseManager", `Target IDs: ${targetIds} for Source ID: ${element.id}`);
          
          for (const targetId of targetIds) { 
            const targetElementProps = briefcaseDb.elements.getElementProps<PhysicalElementProps>({id: targetId, wantGeometry: false});
            pcfContent += relationshipTransformer.transform(ecClass.Relationship, elementProps, targetElementProps);
        }
      }

    }
  });

  writePCFFile('output.pcf', pcfContent);


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

    initializeLogging(process.env.LOG_LEVEL);
    await startupIModelHost();
    await downloadAndProcessBriefcase();

    // await authClient.signOut(); // Sign out of iTwin.js
  } catch (error) {
    console.error("Error during execution:", error);
  }
})();