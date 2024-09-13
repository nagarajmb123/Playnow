import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function Publish() {
  const navigate = useNavigate();
  const thumbnailFileTypes = ["JPG", "PNG", "JPEG"];
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const videoFileTypes = ["MP4", "MOV"];
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [thumbanil, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const handleChangeThumbnail = (file) => {
    setThumbnail(file);
  };
  console.log(thumbanil);
  const handleChangeVideo = (file) => {
    setVideo(file);
  };
  const handleSubmit = async () => {
    try {
      if (
        [title, description].some((fieled) => fieled?.trim() === "") &&
        video &&
        thumbanil
      ) {
        setError("required fields are missing");
      } else {
        setIsLoading(true);
        const res = await axios.post(
          "https://playitnow-backend.playitnow.co/api/v1/videos/publish",
          {
            title,
            description,
            thumbnail: thumbanil,
            videoFile: video,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // This option should be included here
          }
        );
        if (res.status === 202) {
          setIsLoading(false);
          navigate("/");
        }
      }
    } catch (err) {
      const startIndex =
        err.response?.data.indexOf("Error: ") + "Error: ".length;
      const endIndex = err.response?.data.indexOf("<br>");
      const errorMessage = err.response?.data.substring(startIndex, endIndex);
      setIsLoading(false);
      setError(errorMessage);
      console.log(err.response);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div className="-ml-8 md:ml-auto">
      <div>
        <Toaster />
      </div>
      <h1 className="text-3xl font-bold text-white p-3  mb-10">
        Publish Your video
      </h1>
      <div className="flex flex-col gap-5">
        <div>
          <TextField
            className="bg-violet-400/60 text-white"
            label="Title"
            variant="outlined"
            placeholder="Search..."
            size="small"
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            className="bg-violet-400/60 text-white"
            label="Description"
            variant="outlined"
            placeholder="Search..."
            size="large"
            multiline
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 100 }}
            InputProps={{
              style: {
                overflowWrap: "break-word", // Wrap long words onto the next line
              },
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          {" "}
          <label className="text-white font-semibold text-2xl">Thumbnail</label>
          <FileUploader
            handleChange={handleChangeThumbnail}
            name="file"
            types={thumbnailFileTypes}
          />
          <label className="text-white font-semibold text-2xl">Video</label>
          <FileUploader
            handleChange={handleChangeVideo}
            name="file"
            types={videoFileTypes}
          />
        </div>
        <div className="text-white bg-slate-600/30 p-4 rounded-md">
          <h1 className="text-2xl font-semibold mb-5">
            "Please note the following before uploading your video:{" "}
          </h1>
          <ol className="p-2 list-disc">
            <li>Accepted file formats: MP4 or MOV.</li>
            <li>Maximum file size: 80MB. </li>
            <li>
              Ensure your video meets these requirements to avoid upload errors.
            </li>
            <li>
              For optimal viewing experience, consider using a supported format
              and keeping the file size within the limit.
            </li>
          </ol>
          <h1 className="text-2xl font-semibold mt-5">
            Thank you for your cooperation!"{" "}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="p-4 bg-violet-700 rounded-md"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <BeatLoader color="rgba(54, 99, 214, 1)" />
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;
