import { Router } from "express";
// import AuthController from "../../controllers/AuthController";
import passport from "passport";
// var passport = require("passport");

const router = Router();

router.get("/login",(req,res) => {res.send("Hello World!")
    });

export default router;
