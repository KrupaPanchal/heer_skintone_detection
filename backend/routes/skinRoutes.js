import express from "express";
import multer from "multer";
import { analyzeSkin } from "../controllers/skinController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("image"), analyzeSkin);

export default router;
