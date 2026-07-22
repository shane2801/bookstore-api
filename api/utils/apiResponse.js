export const successResponse = (
  res,
  {
    data = null,
    message = 'Success',
    statusCode = 200,
    meta = null
  } = {}
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    ...(data !== null && { data }),
    ...(meta && { meta }),
    timestamp: new Date().toISOString()
  });
};

export const errorResponse = (
  res,
  {
    message = 'Error',
    statusCode = 500,
    code = 'SERVER_ERROR',
    errors = null
  } = {}
) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    error: {
      message,
      code,
      ...(errors && { details: errors })
    },
    timestamp: new Date().toISOString()
  });
};