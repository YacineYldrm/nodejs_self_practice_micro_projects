import { refreshTokenService } from "../services/refreshTokenService.js";
import { catchAsync } from "../utils/catchAsync.js";

export const refreshTokenCtrl = catchAsync(
    async (req, res) => {
        const refreshToken = req.session.refreshToken;
        console.log(refreshToken);
        const newAccessToken = await refreshTokenService(refreshToken);
        res.status(200).json({ success: true, newAccessToken: newAccessToken });
    },
    { message: "Invalid authentication" }
);
