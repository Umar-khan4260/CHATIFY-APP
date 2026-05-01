import express from "express";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const route = express.Router();

route.use(arcjetProtection, protectRoute);

route.get("/contacts", getAllContacts);

route.get("/chats", getChatPartners);

route.get("/:id", getMessagesByUserId);

route.post("/chats/:id", sendMessage);

export default route;
