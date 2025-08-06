export const getTokenFromHeader = (req) => {
    //get token from header
    // console.log(req)
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token === undefined || "") {
        return "No token found in the header";
    } else {
        // console.log(token)
        return token;
    }
};