

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

  Logger.logInfo("main", "Print this line if default logging is set to Info or lower");

  Logger.logInfo("Logging.ConsoleLogger", "Logging initialized");
  
})();