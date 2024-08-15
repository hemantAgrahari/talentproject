import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
    const userData = req.body;
    // console.log("checking the payload ", userData.email);
    const result = await User.findOne({ email: userData.email.toLowerCase() });
    console.log("checking the result", result);
    if (result === null) {
        userData.password = await bcrypt.hash(userData.password, 10);
        await User.create(userData);
        res.send({ value: false, message: 'Successfully registered!' });
    } else {
        res.send({
            value: true,
            message: "User Already exits!"
        });
    }
    return;
    // if (!User.findOne({ email: userData.email.toLowerCase() })) {
    //     return res.status(400).send({ status: true, message: 'User Already Exists' });
    // }

    // else {
    // userData.password = await bcrypt.hash(userData.password, 10);
    // await User.create(userData);
    // res.status(200).send({ status: true, message: 'Successfully registered!' });
}



export const login = async (req, res) => {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email.toLowerCase() }).select('+password');

    console.log("userdata login-------------->", userData)

    if (!userData) {
        res.status(401).send({ status: false, message: 'Invalid credentials' });
        return;
    }

    if (!bcrypt.compare(password, userData.password)) {
        res.status(401).send({ status: false, message: 'Invalid credentials' });
        return;
    }

    const jwtToken = await userData.generateJWTToken();

    res.cookie('token', jwtToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send({
        token: jwtToken,
        status: true, message: "Successfully loggedIn!"
    })
}



// export const getProfile = async (req, res) => {

//     const userId = req.user.id;
//     console.log("userId getProfile----->", userId);
//     const userDetail = await User.findById(userId);

//     res.status(200).send(userDetail);

// }



