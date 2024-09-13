import { Router } from "express";
import { deleteVideo, getAllVideos, getPrivateVideos, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/publish").post(verifyJWT, upload.fields(
    [
        {
            name: "videoFile",
            maxCount: 1
        }, {
            name: "thumbnail",
            maxCount: 1
        }
    ]), publishAVideo)
router.route("/fetchVideo/:videoId").get(verifyJWT, getVideoById)
router.route("/delete/:videoId").delete(verifyJWT, deleteVideo)
router.route("/getAllVideos").get(verifyJWT, getAllVideos)
router.route("/togglePublish/:videoId").patch(verifyJWT, togglePublishStatus)
router.route("/updateVideo/:videoId").patch(verifyJWT, upload.single(
    "thumbnail"
), updateVideo)
router.route("/privateVideo").get(verifyJWT, getPrivateVideos)

export default router;