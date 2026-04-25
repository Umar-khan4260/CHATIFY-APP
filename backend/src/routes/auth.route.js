import express from "express";
import {
  signup,
  login,
  logout,
  updateprofile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";    

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/updateprofile", protectRoute, updateprofile);

router.get("/check", protectRoute, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});

export default router;
