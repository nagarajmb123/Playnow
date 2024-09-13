import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: toggle like on video
    const like = await Like.findOneAndDelete({ likedBy: req?.user._id, video: videoId })

    if (like) {

        return res.status(201).json(new ApiResponse(201, like, "Successfully unliked"))
    } else {
        const newLike = await Like.create({ likedBy: req?.user._id, video: videoId })
        return res.status(200).json(new ApiResponse(200, newLike, "Successfully liked"))

    }
})


const likesAndStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const pipeline = [
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $group: {
                _id: null,
                totalLikes: { $sum: 1 },
                likedByUsers: { $addToSet: "$likedBy" }
            }
        },
        {
            $project: {
                totalLikes: 1,
                likedByCurrentUser: { $in: [req.user?._id, "$likedByUsers"] }
            }
        }
    ];
    const likeStats = await Like.aggregate(pipeline)
    if (!likeStats) {
        throw new ApiError(500, "Somethings wrong in db")
    }
    if (likeStats.length > 0)
        return res.status(200).json(new ApiResponse(200, likeStats, "Successfully fetched"))
    else
        return res.status(200).json(new ApiResponse(200, [{
            "_id": null,
            "totalLikes": 0,
            "likedByCurrentUser": false
        }], "Successfully fetched"))
})
// const toggleCommentLike = asyncHandler(async (req, res) => {
//     const { commentId } = req.params
//     //TODO: toggle like on comment

// })

// const toggleTweetLike = asyncHandler(async (req, res) => {
//     const { tweetId } = req.params
//     //TODO: toggle like on tweet
// }
// )

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

})

export {
    // toggleCommentLike,
    // toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
    likesAndStatus
}