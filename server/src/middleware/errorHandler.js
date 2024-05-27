import logger from "../config/logger.js";

export function errorHandler(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
}
