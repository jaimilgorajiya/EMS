import express from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser } from "../controllers/User.Controller.js";
import { verifyToken, isAdmin } from "../middleware/Auth.Middleware.js";

const router = express.Router();

router.post("/create", verifyToken, isAdmin, createUser);
router.get("/", verifyToken, isAdmin, getUsers);
router.get("/:id", verifyToken, isAdmin, getUser);
router.put("/:id", verifyToken, isAdmin, updateUser);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;
