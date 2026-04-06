// HTTP Status Codes and Error Messages
const ERRORS = {
  // Success Codes
  SUCCESS: { status: 200, message: "Success" },
  CREATED: { status: 201, message: "Resource created successfully" },

  // Client Error Codes
  BAD_REQUEST: { status: 400, message: "Bad Request" },
  UNAUTHORIZED: { status: 401, message: "Unauthorized" },
  FORBIDDEN: { status: 403, message: "Forbidden" },
  NOT_FOUND: { status: 404, message: "Resource not found" },
  CONFLICT: { status: 409, message: "Resource already exists" },

  // Server Error Codes
  SERVER_ERROR: { status: 500, message: "Internal Server Error" },

  // Specific Errors
  INVALID_ID: { status: 400, message: "Invalid ID format" },
  VALIDATION_ERROR: { status: 400, message: "Validation failed" },
  CAST_ERROR: { status: 400, message: "Invalid data type" },
  DUPLICATE_KEY: { status: 409, message: "This resource already exists" },
};

module.exports = ERRORS;
