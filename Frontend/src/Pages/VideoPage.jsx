import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Comments from "../components/Comments";
import { Avatar } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useSelector } from "react-redux";
function VideoPage() {
  const { videoID } = useParams();
  const [video, setVideo] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const [subInfo, setSubInfo] = useState();
  const [render, setRender] = useState(false);
  const [likeStats, setLikeStats] = useState();
  const [likeToggle, setLikeToggle] = useState();
  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await axios.get(
          `https://playitnow-backend.playitnow.co/api/v1/videos/fetchVideo/${videoID}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 202) {
          setVideo(res?.data?.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const addToWatchHisrory = async () => {
      try {
        const res = await axios.patch(
          `https://playitnow-backend.playitnow.co/api/v1/users/addToWatchHistory/${videoID}`,
          {
            withCredentials: true,
          }
        );
        console.log("watch", res);
        if (res.data.success) {
          console.log("Added To watchHistory");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getVideo();
    addToWatchHisrory();
  }, []);
  useEffect(() => {
    const getLikeDetails = async () => {
      try {
        const res = await axios.get(
          `https://playitnow-backend.playitnow.co/api/v1/likes/likeStats/${videoID}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setLikeStats(res?.data?.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLikeDetails();
  }, [likeToggle]);
  if (likeStats) console.log("likestats", likeStats);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          `https://playitnow-backend.playitnow.co/api/v1/users/get-user-channel/${video?.owner[0].username}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          console.log(res);
          setSubInfo(res?.data?.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    if (video) getUserInfo();
  }, [render, video]);
  const userdata = useSelector((state) => state.auth.userData);
  const handleNavigate = () => {
    if (video?.owner[0].username === userdata?.username) {
      navigate("/profile");
    } else {
      navigate(`/profile/${video?.owner[0].username}`);
    }
  };
  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        `https://playitnow-backend.playitnow.co/api/v1/subscription/toggleSubscribe/${subInfo?._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200 || res.status === 201) {
        setRender((prev) => !prev);
        console.log(res);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `https://playitnow-backend.playitnow.co/api/v1/likes/videoLiked/${videoID}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setLikeToggle((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // if (video) console.log(video);
  return (
    <div className=" flex flex-col justify-center items-center pb-10">
      <div className=" ">
        <h1 className="text-white opacity-0 md:opacity-100 font-bold text-3xl my-10">
          Play Now..! Watch Now..! Enjoy Now..!
        </h1>
        <div
          className={`xl:h-[720px] xl:w-[1280px] sm:h-360 sm:w-640 lg:h-648 lg:w-1152 flex justify-center items-center`}
        >
          <ReactPlayer
            url={video?.videoFile}
            playIcon
            controls={true}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
              facebook: {
                appId: "12345",
              },
            }}
            width="100%"
            height="100%"
          />
        </div>
        <div className="flex justify-between">
          <h1 className="text-xl md:text-3xl font-bold text-white my-5 ml-4">
            {video?.title}
          </h1>
          <IoIosArrowDropdownCircle
            size={32}
            className="text-white my-5"
            onClick={() => {
              setShowDetails((state) => !state);
            }}
          />
        </div>
        <div>
          {showDetails && (
            <div className="bg-gray-700  flex flex-col justify-center items-center p-4 mb-4 rounded-md text-gray-500 ml-4">
              <p>{video?.createdAt.slice(0, 10)}</p>
              <p className="text-wrap">{video?.description}</p>
            </div>
          )}
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex gap-4 align-middle justify-center ">
            <Avatar
              src={video?.owner[0].avatar}
              size="50"
              className="my-auto"
            />

            <h1
              className="text-xl md:text-3xl font-semibold p-2 text-violet-700 cursor-pointer"
              onClick={handleNavigate}
            >
              {video?.owner[0].username}
            </h1>
          </div>
          {video?.owner[0].username !== userdata.username && (
            <button
              className={`${
                !subInfo?.isSubscribed ? "bg-red-600" : "bg-violet-700"
              } p-2 md:p-4 rounded-md font-semibold antialiased`}
              onClick={handleSubscribe}
            >
              {subInfo?.isSubscribed ? "UnSubscribe" : "Subscribe"}
            </button>
          )}
        </div>
      </div>
      <div className="mb-10 flex w-[60vw] justify-start">
        <div
          className={`${
            !likeStats?.likedByCurrentUser ? "bg-black" : "bg-violet-700"
          } p-3 rounded-s-md hover:bg-violet-900 transition`}
          onClick={handleLike}
        >
          {console.log(likeStats?.likedByCurrentUser)}
          <ThumbUpIcon style={{ fill: "white" }} />
        </div>
        <div className="bg-violet-700  p-3 rounded-e-md hover:bg-violet-900 transition">
          <h1 className="text-white font-bold pr-1">{likeStats?.totalLikes}</h1>
        </div>
      </div>
      <div>{video && <Comments id={video?._id} />}</div>
    </div>
  );
}

export default VideoPage;
