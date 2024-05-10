const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");

const URL = require("./Models/url");

const urlRoute = require("./Routes/url");
const staticRoute = require("./Routes/staticRouter");
const userRoute = require("./Routes/user");


const app = express();
const PORT = 8002;
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["Normal","Admin"]), urlRoute);
app.use("/",  staticRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        );

        if (!entry) {
            return res.status(404).send("URL not found");
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
