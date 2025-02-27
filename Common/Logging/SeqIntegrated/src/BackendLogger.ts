import { Logger, LoggerLevelsConfig } from "@itwin/core-bentley";
import bunyan from "bunyan";
import seq from "bunyan-seq";
import config from "./Logger.config.json";

/**
 * Initializes logging for the application.
 */
export function initializeLogging(logLevel: string = "Error"): void {

  const bunyanLogger = bunyan.createLogger({
    name: process.env.APP_NAME || "SeqLogger",
    streams: [
      {
        stream: process.stdout,
        level: process.env.LOG_LEVEL?.toLowerCase() as bunyan.LogLevel || "error",
      },
      seq.createStream({
        serverUrl: process.env.SEQ_URL || "http://127.0.0.1:5341",
        apiKey: process.env.SEQ_API_KEY || "",
        level: process.env.LOG_LEVEL?.toLocaleLowerCase() as bunyan.LogLevel || "error"
      })
    ]
  });

  const bunyanLogFunction = (category: string, message: string, meta: any) => {
    bunyanLogger.info({ category, ...meta }, message);
  };

  /*
   Note: The initialize will set the default log level to undefined and category to empty 
   Its important to set the default log level and configure after calling initialize
   */
  Logger.initialize(bunyanLogFunction, bunyanLogFunction, bunyanLogFunction, bunyanLogFunction);

  if ("loggerConfig" in config) {
    config.loggerConfig.defaultLevel = logLevel;
    Logger.validateProps(config.loggerConfig);
    Logger.configureLevels(config.loggerConfig as LoggerLevelsConfig);
  }
  
}