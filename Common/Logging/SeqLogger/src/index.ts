

import * as dotenv from "dotenv";
import bunyan from "bunyan";
import * as seq from "bunyan-seq";

// Load environment variables from .env file
dotenv.config();

const Logger = bunyan.createLogger({
  name: process.env.APP_NAME || "SeqLogger",
  streams: [
      {
          stream: process.stdout,
          level: process.env.LOG_LEVEL as bunyan.LogLevel || "error",
      },
      seq.createStream({
          serverUrl: process.env.SEQ_URL || "http://localhost:5341",
          apiKey: process.env.SEQ_API_KEY || "",
          level: process.env.LOG_LEVEL as bunyan.LogLevel || "error" 
      })
  ]
});

/**
 * Main function initializing logging
 * @async
 * @function main
 */
(() => {
  Logger.info('Hi!');
  Logger.warn('Warning from Seq');
})();