import { Router } from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";


const router = Router();

router.put("/:id", verifyAdmin, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getSingleUser);
router.get("/", verifyAdmin, getAllUser);

export default router; 