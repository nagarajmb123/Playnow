import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { likesAndStatus, toggleVideoLike } from "../controllers/like.controller.js";

const router = Router();

router.route("/videoLiked/:videoId").post(verifyJWT, toggleVideoLike)
router.route("/likeStats/:videoId").get(verifyJWT, likesAndStatus)
export default router