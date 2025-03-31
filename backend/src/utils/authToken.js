import jwt from 'jsonwebtoken';

export const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV == "production" ? 'none': 'strict',
        secure: process.env.NODE_ENV == "production"
    })
}