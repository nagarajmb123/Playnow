import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.models.js"
import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    // TODO: toggle subscription
    if (channelId === req?.user?._id) {
        throw new ApiError(400, "Cannot subscribe Yourself")
    }
    const subscribe = await Subscription.findOneAndDelete({ subscriber: req?.user._id, channel: channelId })
    if (subscribe) {
        return res.status(201).json(new ApiResponse(201, subscribe, "Successfully unsubscribed"))
    } else {
        const newSubscribe = await Subscription.create({ subscriber: req?.user._id, channel: channelId })
        return res.status(200).json(new ApiResponse(200, newSubscribe, "Successfully subscribed"))
    }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    const channels = await Subscription.aggregate([
        {
            $match: {
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "channel",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1,
                            _id: 1
                        }
                    }
                ]
            }
        }
    ])
    return res.status(200).json(new ApiResponse(200, channels, "Subscribed channels"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}