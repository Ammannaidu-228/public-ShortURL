const express = require("express");
const router = express.Router();
const URL = require("../Models/url");
const { restrictTo } = require("../middlewares/auth");


router.get("/", restrictTo(["Normal", "Admin"]) , async(req,res)=>{
    if(req.user.role === "Admin"){
        const allurls = await URL.find({});
        return res.render("home", {
            urls: allurls,
    });
        
    }
    else{
        const allurls = await URL.find({ createdBy: req.user._id});
        return res.render("home", {
            urls: allurls,
    });
    }
})
router.get("/home", (req,res)=>{
    return res.render("home");
})


router.get("/signup", (req, res)=>{
    return res.render("signup");
})
router.get("/login", (req, res)=>{
    return res.render("login");
})


module.exports = router;