import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
    // console.log(token)
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return false;
        } else {
            // console.log(decoded)
            return decoded;

        }
    });
};