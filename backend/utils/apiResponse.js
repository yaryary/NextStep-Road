// Ensure all successful API responses are formatted the same
export function sendSuccess(res, {statusCode = 200, message= "OK", data = null, meta} = {}){
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...arguments(meta? { meta } : {}),
    });
}