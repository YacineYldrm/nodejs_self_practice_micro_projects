import { registerService } from "../services/register.js";

export const registerCtrl = async (req, res) => {
    try {
        const user = req.body;
        const newUser = await registerService(user);
        res.status(200).json({
            success: true,
            newUser: {
                email: newUser.email,
            },
            message: "Registration successful!",
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
