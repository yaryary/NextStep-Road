// Express does not catch errors thrown inside async functions, catches any rejected promise and forwards it to the error middleware
export const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);