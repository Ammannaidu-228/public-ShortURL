const jwt = require("jsonwebtoken");
const secret = "$Ama@n12";

function setUser(user){

    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        }, secret);
}

function getUser(token) {
    try {
        if (!token) return null;
        return jwt.verify(token, secret);
    } catch (error) {
        // Handle verification errors
        console.error("JWT Verification Error:", error.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}