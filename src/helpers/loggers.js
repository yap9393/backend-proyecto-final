import winston from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import { config } from "../config/config.js";

// Define tus niveles personalizados
const customLevels = {
  debug: 5,
  http: 4,
  info: 3,
  warning: 2,
  error: 1,
  fatal:0
};

//logger para dev
const devLogger = winston.createLogger({
    levels: customLevels,
    transports: [
      new winston.transports.Console({ level: "info" }),
    ]
  });
  

//logger para prod
const prodLogger = winston.createLogger({
  levels: customLevels,
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, "/logs/prod.log"), level: "info" }),
    new winston.transports.File({ filename: path.join(__dirname, "/logs/errors.log"), level: "error" })  // Nuevo transporte para errores
  ]
});

let logger;
if ( config.environment.nodeEnv === "development") {
  logger = devLogger;
} else {
  logger = prodLogger;
}

export { logger };
