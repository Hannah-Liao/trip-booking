import { Router } from "express";
import { createReview } from "../controllers/reviewsController.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = Router();

router.post("/:tourId", verifyToken, createReview)

export default router;