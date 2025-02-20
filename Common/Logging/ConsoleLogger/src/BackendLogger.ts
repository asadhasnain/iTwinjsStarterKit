import { Logger, LoggerLevelsConfig } from "@itwin/core-bentley";
import config from "./Logger.config.json";


/**
 * Initializes logging for the application.
 */
export function initializeLogging(logLevel: string = "Error"): void {
  Logger.initializeToConsole();

  
  if ("loggerConfig" in config) {
    config.loggerConfig.defaultLevel = logLevel;
    Logger.validateProps(config.loggerConfig);
    Logger.configureLevels(config.loggerConfig as LoggerLevelsConfig);
  }
}
