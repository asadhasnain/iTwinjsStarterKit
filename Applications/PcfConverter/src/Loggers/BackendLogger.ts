import { Logger, LoggerLevelsConfig } from "@itwin/core-bentley";
import config from "../Logger.config.json";



export function initializeLogging(logLevel: string = "Trace"): void {

  Logger.initializeToConsole();

  // Configure log levels by category
  if ("loggerConfig" in config) {
    config.loggerConfig.defaultLevel = logLevel;
    Logger.validateProps(config.loggerConfig);
    Logger.configureLevels(config.loggerConfig as LoggerLevelsConfig);
  }
}