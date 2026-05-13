import express from "express";
import {
  signup,
  login,
  logout,
  updateprofile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection); // Apply Arcjet protection to all routes in this router

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.put("/updateprofile", protectRoute, updateprofile);

router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
