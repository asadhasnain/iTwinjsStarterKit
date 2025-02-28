import { Logger, LoggerLevelsConfig } from "@itwin/core-bentley";
import bunyan from "bunyan";
import seq from "bunyan-seq";
import config from "./Logger.config.json";

/**
 * Creates and configures the Bunyan logger.
 */
function createBunyanLogger(): bunyan {
  return bunyan.createLogger({
    name: process.env.APP_NAME || "SeqLogger",
    streams: [
      {
        stream: process.stdout,
        level: process.env.LOG_LEVEL?.toLowerCase() as bunyan.LogLevel || "error",
      },
      seq.createStream({
        serverUrl: process.env.SEQ_URL || "http://127.0.0.1:5341",
        apiKey: process.env.SEQ_API_KEY || "",
        level: process.env.LOG_LEVEL?.toLowerCase() as bunyan.LogLevel || "error"
      })
    ]
  });
}

/**
 * Initializes logging for the application.
 */
export function initializeLogging(logLevel: string = "Error"): void {

  const bunyanLogger = createBunyanLogger();

  const bunyanLogFunction = (category: string, message: string, meta: any, level: string) => {
    switch (level.toLowerCase()) {
      case "error":
        bunyanLogger.error({ category, ...meta }, message);
        break;
      case "warn":
        bunyanLogger.warn({ category, ...meta }, message);
        break;
      case "info":
        bunyanLogger.info({ category, ...meta }, message);
        break;
      case "trace":
        bunyanLogger.trace({ category, ...meta }, message);
        break;
      default:
        bunyanLogger.info({ category, ...meta }, message);
        break;
    }
  };

  /*
   Note: The initialize will set the default log level to undefined and category to empty 
   Its important to set the default log level and configure after calling initialize
   */
  Logger.initialize(
    (category, message, meta) => bunyanLogFunction(category, message, meta, "error"),
    (category, message, meta) => bunyanLogFunction(category, message, meta, "warn"),
    (category, message, meta) => bunyanLogFunction(category, message, meta, "info"),
    (category, message, meta) => bunyanLogFunction(category, message, meta, "trace")
  );

  if ("loggerConfig" in config) {
    config.loggerConfig.defaultLevel = logLevel;
    Logger.validateProps(config.loggerConfig);
    Logger.configureLevels(config.loggerConfig as LoggerLevelsConfig);
  }
}