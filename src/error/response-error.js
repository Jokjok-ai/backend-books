import { randomBytes } from "crypto";

class ResponseError extends Error {
  constructor(status, message, ziyad_error_code = "ZYD-ERR-UNKNOWN") {
    super(message);
    this.status = status;
    this.ziyad_error_code = ziyad_error_code;
    this.trace_id = randomBytes(4).toString("hex").toUpperCase();
  }
}

export { ResponseError };
