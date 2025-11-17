import express from "express";
import {
  deleteChat,
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);

// ✅ MUST COME BEFORE "/:id"
router.delete("/delete/:id", deleteChat);

router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
