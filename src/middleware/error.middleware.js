
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";

    const errors = Object.values(err.errors).map(
      (error) => error.message
    );

    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  // Duplicate MongoDB field
  if (err.code === 11000) {
    statusCode = 409;
    message = "A record with this value already exists";
  }

  // Development-only error details
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

    return res.status(statusCode).json({
        success: false,
        message,
        ...(err.errors && { errors: err.errors }),
    });
};

export default errorHandler;
