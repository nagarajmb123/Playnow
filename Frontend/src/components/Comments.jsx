import axios from "axios";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import CommentCard from "./CommentCard";
import BottomActionsCard from "./CommentCard";
import toast, { Toaster } from "react-hot-toast";
function Comments({ id }) {
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState("");
  const [newCommentFetch, setNewCommentFetch] = useState(false);
  console.log(id);
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          `https://playitnow-backend.playitnow.co/api/v1/comments/getAllComents/${id}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setComments(res?.data?.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    if (id) getComments();
  }, [newCommentFetch]);
  console.log(comments);
  const handleComment = async () => {
    try {
      if (newComment.trim() !== "") {
        const res = await axios.post(
          "https://playitnow-backend.playitnow.co/api/v1/comments/addComment",
          {
            videoID: id,
            comment: newComment,
          },
          {
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.status === 201) {
          console.log(res);
          setNewCommentFetch((prev) => !prev);
          toast.success("Successfully Commented");
        }
      } else {
        toast.error("Content is Empty");
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  console.log(newComment);
  return (
    <div className="text-white w-[60vw]">
      <div>
        <Toaster />
      </div>
      <div className="border-white border flex my-10 w-full">
        <TextField
          className="bg-violet-400/60 text-white"
          label="Comment"
          variant="outlined"
          placeholder="Search..."
          size="small"
          fullWidth
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <IconButton aria-label="search" onClick={handleComment}>
          <SendIcon style={{ fill: "purple" }} />
        </IconButton>
      </div>
      <ul className="flex flex-col gap-5">
        {comments &&
          comments
            .slice()
            .reverse()
            .map((comment) => (
              <li key={comment?._id} className="w-full">
                <BottomActionsCard {...comment} />
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Comments;
