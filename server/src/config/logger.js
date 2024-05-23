import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  format as _format,
  transports as _transports,
  createLogger,
} from "winston";

// Get the current directory in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logDirectory = join(__dirname, "../logs"); // Adjust the path as necessary

const logger = createLogger({
  level: "info",
  format: _format.combine(_format.timestamp(), _format.json()),
  transports: [
    new _transports.File({
      filename: join(logDirectory, "error.log"),
      level: "error",
    }),
    new _transports.File({ filename: join(logDirectory, "combined.log") }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new _transports.Console({
      format: _format.simple(),
    })
  );
}

export default logger;
