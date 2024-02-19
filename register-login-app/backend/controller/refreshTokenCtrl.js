import { refreshTokenService } from "../services/refreshTokenService.js";

export const refreshTokenCtrl = async (req, res) => {
    try {
        const newAccessToken = await refreshTokenService(
            req.signedCookies.refreshToken
        );
        res.status(200).json({ success: true, newAccessToken: newAccessToken });
    } catch (error) {
        res.status(401).json({ success: false, error: error });
    }
};
