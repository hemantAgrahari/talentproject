import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const userData = req.body;
        const result = await User.findOne({ email: userData.email.toLowerCase() });
        console.log("checking the result", result);

        if (result === null) {
            userData.password = await bcrypt.hash(userData.password, 10);
            await User.create(userData);
            res.status(201).send({ value: true, message: 'Successfully registered!' });
        } else {
            res.status(409).send({
                value: false,
                message: "User Already exists!"
            });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ status: false, message: "Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email: email.toLowerCase() }).select('+password');

        console.log("userdata login-------------->", userData);

        if (!userData) {
            res.status(401).send({ status: false, message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            res.status(401).send({ status: false, message: 'Invalid credentials' });
            return;
        }

        const jwtToken = await userData.generateJWTToken();

        res.cookie('token', jwtToken, {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).send({
            token: jwtToken,
            status: true,
            message: "Successfully logged in!"
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ status: false, message: "Server Error" });
    }
};

export const testApi = async (req, res) => {
    res.status(200).send({
        status: true,
        message: "Successfully logged in!"
    });
}
