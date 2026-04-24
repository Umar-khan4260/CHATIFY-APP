import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", (req, res) => {
  // Handle login logic here
  res.send("Login successful");
});

router.post("/signup", signup);

router.get("/logout", (req, res) => {
  // Handle logout logic here
  res.send("Logout successful");
});

export default router;
