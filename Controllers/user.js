
const User = require("../Models/user");
const {setUser} = require("../service/auth");


async function handleUserSignUp(req, res) {
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");

}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email,password });
    if(!user){
        return res.render("login", {error: "invalid Username or Password"});
    }
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");

}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
};