

import * as dotenv from "dotenv";
import { initializeLogging } from "./BackendLogger";
import { Logger } from "@itwin/core-bentley";

// Load environment variables from .env file
dotenv.config();

/**
 * Main function initializing logging
 * @async
 * @function main
 * @returns {Promise<void>}
 */
(() => {

  initializeLogging(process.env.LOG_LEVEL);

  Logger.logError("Logging.SeqIntegrated", "Logging Seq Error");
  Logger.logWarning("Logging.SeqIntegrated", "Logging Seq Warning");
  Logger.logInfo("Logging.SeqIntegrated", "Logging Seq Info");
  Logger.logTrace("Logging.SeqIntegrated", "Logging Seq Trace");

  
})();