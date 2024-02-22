import { registerService } from "../services/registerService.js";
import { catchAsync } from "../utils/catchAsync.js";

export const registerCtrl = catchAsync(
    async (req, res) => {
        console.log(req.body);
        const newUser = await registerService(req.body);
        res.status(201).json({
            success: true,
            result: { email: newUser.email, userId: newUser._id },
        });
    },
    { message: "User registration failed" }
);
