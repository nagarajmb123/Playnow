import React, { useEffect, useState } from "react";
import ActionAreaCard from "../components/HomeCard";
import coverImage2 from "../assets/proxy (39).jpeg";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [subInfo, setSubInfo] = useState();
  const [videos, setVideos] = useState();
  const [render, setRender] = useState(false);
  const { username } = useParams();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          `https://playitnow-backend.playitnow.co/api/v1/users/get-user-channel/${username}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          console.log("sub", res);
          setSubInfo(res?.data?.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };

    getUserInfo();
  }, [render]);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          "https://playitnow-backend.playitnow.co/api/v1/videos/getAllVideos",
          {
            params: { userId: userData?._id },
            withCredentials: true, // This option should be included here
          }
        );

        setVideos(res?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (subInfo) fetchVideo();
  }, [subInfo]);
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
  console.log(videos);
  return (
    <div className={` flex flex-col items-start pb-10  -ml-12`}>
      <div>
        <img
          src={subInfo?.coverImage || coverImage2}
          alt="coverImage"
          className="h-24 lg:ml-0 lg:h-64 w-[100vw]  object-cover"
        />
        <div className="flex flex-col lg:flex-row justify-around bg-violet-500/30 w-[100vw] p-3">
          <div className="p-4 flex gap-6 lg:gap-16">
            <div className="w-32 h-32 lg:w-64 lg:h-64">
              <Avatar
                src={subInfo?.avatar}
                sx={{ width: "100%", height: "100%" }}
                className="ring ring-violet-700"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl lg:text-4xl font-bold text-white">
                {subInfo?.fullName}
              </h1>
              <p className="text-2xl font-semibold text-gray-600">
                {subInfo?.username}
              </p>
            </div>
          </div>
          <div className=" rounded-lg text-white flex flex-col lg:justify-center lg:items-center mx-6 gap-5">
            <div>
              <button
                className={`${
                  !subInfo?.isSubscribed ? "bg-red-600" : "bg-violet-700"
                } p-2 rounded-md`}
                onClick={handleSubscribe}
              >
                {subInfo?.isSubscribed ? "UnSubscribe" : "Subscribe"}
              </button>
            </div>
            <div className=" rounded-lg text-white flex flex-col lg:flex-row justify-center lg:items-center gap-5 ">
              <div className="flex flex-col justify-center items-center bg-violet-700 p-2 rounded-md">
                <h1 className="text-lg lg:text-2xl font-bold">
                  {subInfo?.subscribersCount}
                </h1>
                <p className="text-md lg:text-lg font-semibold">
                  Subscribers Count
                </p>
              </div>
              <div className="flex flex-col justify-center items-center bg-violet-700 p-2 rounded-md">
                <h1 className="text-lg lg:text-2xl font-bold">
                  {subInfo?.channelSubscribedToCount}
                </h1>
                <p className="text-md lg:text-lg font-semibold">
                  Channel Subscribed To
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:block">
          <h1 className="text-white font-bold text-3xl p-2">Videos</h1>
          <div>
            <ul className="flex gap-10 flex-wrap">
              {videos &&
                videos.map((vid) => (
                  <li>
                    <ActionAreaCard {...vid} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
