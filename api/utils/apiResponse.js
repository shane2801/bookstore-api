export const successResponse = (
    res,
    data,
    message = 'Success',
    statusCode = 200
) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data
    });
};

export const errorResponse = (
    res,
    message = 'Error',
    statusCode = 500,
    code = 'SERVER_ERROR'
) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        error: {
            message,
            code
        }
    });
};