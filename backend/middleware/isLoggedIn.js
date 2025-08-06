import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";


export const isLoggedIn = async (req, res, next) => {
    //get token from header
    const token = getTokenFromHeader(req);
    // console.log(token)
    // verify the token 
    const decodedUser = verifyToken(token);
    // console.log("Decoded user"+decodedUser)
    if (!decodedUser) {
        throw new Error("Invalid/Expired token, please login again");
        next()
    } else {
        // save the user into req obj
        req.userAuthId = decodedUser?.id;
        next();
    }
}