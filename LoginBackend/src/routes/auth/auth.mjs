import { Router } from "express";
// import AuthController from "../../controllers/AuthController";
import passport from "passport";
// var passport = require("passport");

const router = Router();

// router.get("/",(req,res) => {
//     res.send("Welcome!")
// });

router.post("/api/register",(req,res) => {
    console.log("registration")
    console.log(req.body)
    res.send("successfully created registration")
});

router.post("/api/login",(req,res) => {
    console.log("login")
    console.log(req.body)
    res.send("successfully created login")
});

export default router;
