// HTTP Status Codes and Error Messages
const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const ERRORS = {
  // Success Codes
  SUCCESS: { status: STATUS_CODE.SUCCESS, message: "Success" },
  CREATED: {
    status: STATUS_CODE.CREATED,
    message: "Resource created successfully",
  },

  // Client Error Codes
  BAD_REQUEST: { status: STATUS_CODE.BAD_REQUEST, message: "Bad Request" },
  UNAUTHORIZED: { status: STATUS_CODE.UNAUTHORIZED, message: "Unauthorized" },
  FORBIDDEN: { status: STATUS_CODE.FORBIDDEN, message: "Forbidden" },
  NOT_FOUND: { status: STATUS_CODE.NOT_FOUND, message: "Resource not found" },
  CONFLICT: {
    status: STATUS_CODE.CONFLICT,
    message: "Resource already exists",
  },

  // Server Error Codes
  SERVER_ERROR: {
    status: STATUS_CODE.SERVER_ERROR,
    message: "Internal Server Error",
  },

  // Specific Errors
  INVALID_ID: { status: STATUS_CODE.BAD_REQUEST, message: "Invalid ID format" },
  VALIDATION_ERROR: {
    status: STATUS_CODE.BAD_REQUEST,
    message: "Validation failed",
  },
  CAST_ERROR: { status: STATUS_CODE.BAD_REQUEST, message: "Invalid data type" },
  EMAIL_REQUIRED: {
    status: STATUS_CODE.BAD_REQUEST,
    message: "Email is required",
  },
  INVALID_EMAIL: {
    status: STATUS_CODE.BAD_REQUEST,
    message: "Email must be a valid email address",
  },
  PASSWORD_REQUIRED: {
    status: STATUS_CODE.BAD_REQUEST,
    message: "Password is required",
  },
  DUPLICATE_KEY: {
    status: STATUS_CODE.CONFLICT,
    message: "This resource already exists",
  },
};

module.exports = ERRORS;
