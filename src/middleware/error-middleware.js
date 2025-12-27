// import {ResponseError} from "../error/response-error.js";

// const errorMiddleware = async (err, req, res, next) => {
//     if (!err) {
//         next();
//         return;
//     }

//     if (err instanceof ResponseError) {
//         res.status(err.status).json({
//             errors: err.message
//         }).end();
//     }  else {
//         res.status(500).json({
//             errors: err.message
//         }).end();
//     }
// }

// export {
//     errorMiddleware
// }
import { ResponseError } from "../error/response-error.js";
import { logger } from "../application/logging.js";
import { randomBytes } from "crypto";

const errorMiddleware = (err, req, res, next) => {
  if (!err) return next();

  // business error
  if (err instanceof ResponseError) {
    logger.warn({
      trace_id: err.trace_id,
      code: err.ziyad_error_code,
      message: err.message,
      path: req.originalUrl,
      method: req.method,
    });

    return res.status(err.status).json({
      message: err.message,
      ziyad_error_code: err.ziyad_error_code,
      trace_id: err.trace_id,
    });
  }

  // unexpected error
  const traceId = randomBytes(4).toString("hex").toUpperCase();

  logger.error({
    trace_id: traceId,
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  return res.status(500).json({
    message: "Internal server error",
    ziyad_error_code: "ZYD-ERR-500",
    trace_id: traceId,
  });
};

export { errorMiddleware };
