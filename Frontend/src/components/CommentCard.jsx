import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

export default function BottomActionsCard({ owner, content, createdAt }) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "auto",
        // to make the card resizable
        overflow: "auto",
        resize: "horizontal",
        backgroundColor: "black",
        color: "white",
      }}
      className=" "
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar src={owner?.avatar} size="lg" />

        <CardContent className="ml-5">
          <Typography level="title-lg" color="white" className="text-white ">
            {owner?.username}
          </Typography>
        </CardContent>
      </Box>
      <CardContent>
        <Typography level="body-xs" color="gray" className="text-gray-400">
          {createdAt.slice(0, 10)}
        </Typography>
        <Typography level="body-md" color="white">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
