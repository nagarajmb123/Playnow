import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getSubscribedChannels, toggleSubscription } from "../controllers/subscription.controller.js";

const router = Router()

router.route('/toggleSubscribe/:channelId').post(verifyJWT, toggleSubscription);
router.route('/getSubscribedChannel/:subscriberId').get(verifyJWT, getSubscribedChannels);


export default router;