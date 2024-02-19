import { loginService } from "../services/login.js";

export const loginCtrl = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const { accessToken, refreshToken } = await loginService(
            email,
            password
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            signed: true,
            secure: true,
        });
        res.json({
            success: true,
            tokens: {
                accessToken: accessToken,
            },
        });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};
