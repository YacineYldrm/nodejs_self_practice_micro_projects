import { verificationService } from "../services/verificationService.js";
import { catchAsync } from "../utils/catchAsync.js";

export const verificationCtrl = catchAsync(
    async (req, res) => {
        const userId = req.body.userId;
        const sixDigitCode = req.body.sixDigitCode;
        await verificationService(userId, sixDigitCode);
        res.status(200).json({
            success: true,
            result: "Email verification succeeded!",
        });
    },
    { message: "Email verification failed" }
);
