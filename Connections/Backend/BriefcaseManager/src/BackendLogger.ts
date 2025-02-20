import { Logger, LoggerLevelsConfig } from "@itwin/core-bentley";
import config from "./Logger.config.json";



export function initializeLogging(): void {

  Logger.initializeToConsole();

  // Configure log levels by category
  if ("loggerConfig" in config) {
    Logger.validateProps(config.loggerConfig);
    Logger.configureLevels(config.loggerConfig as LoggerLevelsConfig);
  }
}