import axios from "axios";
import React, { useEffect, useState } from "react";
import ActionAreaCard from "../components/HomeCard";

function WatchHistory() {
  const [videos, setVideos] = useState();
  useEffect(() => {
    const getWatchHistory = async () => {
      try {
        const res = await axios.get(
          "https://playitnow-backend.playitnow.co/api/v1/users/get-watch-history",
          {
            withCredentials: true,
          }
        );
        console.log(res);
        if (res?.data?.success) {
          setVideos(res?.data?.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getWatchHistory();
  }, []);
  console.log(videos);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-white mb-10 p-3 ">
          Watch History
        </h1>
        <ul className="flex gap-16 justify-center flex-wrap">
          {videos &&
            videos
              .slice()
              .reverse()
              .map((vid) => (
                <li
                  key={vid?._id}
                  className=" hover:shadow-violet-700 hover:shadow-xl transition 
                  border-2 border-violet-700 p-2 rounded-md"
                >
                  <ActionAreaCard {...vid} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default WatchHistory;
