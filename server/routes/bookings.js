import { Router } from "express";
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingsController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createBooking)
router.get("/:id", verifyToken, getBooking)
router.get("/", verifyAdmin, getAllBooking)

export default router;