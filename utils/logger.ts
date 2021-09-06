import { Logger, ConsoleTransport, FileTransport } from "egg-logger";

const logger = new Logger({
  level: "WARN",
});
logger.set(
  "file",
  new FileTransport({
    file: "./log.info",
    level: "INFO",
  })
);
logger.set(
  "console",
  new ConsoleTransport({
    level: "INFO",
  })
);
export default logger;

export function info(message: string) {
  logger.info(`====[INFO]==== ${new Date().toLocaleString()} ${message}`);
}

export function warn(message: string) {
  logger.warn(`====[WARN]==== ${new Date().toLocaleString()} ${message}`);
}

export function error(message: string) {
  logger.error(`====[ERROR]==== ${new Date().toLocaleString()} ${message}`);
}
