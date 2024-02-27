import { refreshTokenService } from "../services/refreshTokenService.js";
import { catchAsync } from "../utils/catchAsync.js";

export const refreshTokenCtrl = catchAsync(
    async (req, res) => {
        const userId = req.verifiedUserClaims.sub;
        const newAccessToken = await refreshTokenService(userId);
        res.status(200).json({ success: true, newAccessToken: newAccessToken });
    },
    { message: "Invalid authentication" }
);
