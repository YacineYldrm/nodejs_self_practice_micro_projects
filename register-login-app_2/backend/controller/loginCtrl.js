import { loginService } from "../services/loginService.js";
import { catchAsync } from "../utils/catchAsync.js";

export const loginCtrl = catchAsync(
    async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password);
        const { accessToken, refreshToken } = await loginService(
            email,
            password
        );
        req.session.refreshToken = refreshToken;
        res.status(200).json({
            success: true,
            accessToken: accessToken,
        });
    },
    { message: "Login failed" }
);
