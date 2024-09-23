 const errorMiddleware = (err, _req, res, _next) => {
        // Default message and status code
        err.message = err.message || "Something went wrong!";
        err.statusCode = err.statusCode || 500;
    
        // Send error response
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    };
    
 export default errorMiddleware;
    