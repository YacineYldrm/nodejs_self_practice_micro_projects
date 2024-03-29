export const catchAsync = (
    controllerFn,
    { message = "Internal server error", status = 500 }
) => {
    return (req, res, next) => {
        controllerFn(req, res, next).catch((error) => {
            console.log(error);
            res.status(status).json({
                error,
                message: error.message || message,
            });
        });
    };
};
