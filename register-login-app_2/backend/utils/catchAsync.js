export const catchAsync = (
    controllerFn,
    { message = "Internal server error" }
) => {
    return (req, res) => {
        controllerFn(req, res).catch((error) => {
            console.log(error);
            res.status(500).json({ error, message: error.message || message });
        });
    };
};
