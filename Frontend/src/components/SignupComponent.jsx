import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const [avatar, setAvatar] = React.useState();
  const [coverImage, setCoverImage] = React.useState();
  console.log(coverImage);
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      fullName: data.get("fullName"),
      avatar: data.get("avatar"),
      coverIamge: data.get("coverImage"),
    });
    if (
      [
        data.get("fullName"),
        data.get("email"),
        data.get("username"),
        data.get("password"),
      ].some((fieled) => fieled?.trim() === "")
    ) {
      setError("required fields are missing");
    } else {
      try {
        // console.log("hello");
        const res = await axios.post(
          "https://playitnow-backend.playitnow.co/api/v1/users/register",
          {
            email: data.get("email"),
            password: data.get("password"),
            fullName: data.get("fullName"),
            username: data.get("username"),
            avatar,
            coverImage,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // This option should be included here
          }
        );
        console.log("hello", res);
        if (res?.status === 200) {
          console.log("success", res);
          dispatch(login(res?.data?.data?.createdUser));
          console.log("user", res?.data?.data?.createdUser);
          navigate("/");
        }
      } catch (err) {
        const startIndex =
          err.response?.data.indexOf("Error: ") + "Error: ".length;
        const endIndex = err.response?.data.indexOf("<br>");
        const errorMessage = err.response?.data.substring(startIndex, endIndex);
        setIsLoading(false);
        // console.log(errorMessage);
        setError(errorMessage);
        // console.log(err);
      }
    }
  };
  console.log("avatara", avatar);
  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="text-white ">
        <div>
          <Toaster />
        </div>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="First Name"
                  autoFocus
                  className="bg-gray-200"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="family-name"
                  className="bg-gray-200"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className="bg-gray-200"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  className="bg-gray-200"
                />
              </Grid>
              <Grid item xs={12} className="flex flex-col md:flex-row">
                <label htmlFor="" className="text-white font-semibold mr-2">
                  Avatar *
                </label>

                <input
                  type="file"
                  placeholder="avatar"
                  name="avatar"
                  className="h-10 bg-gray-200 ml-9 text-black p-2 w-[60vw] md:w-auto"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </Grid>
              <Grid item xs={12} className="flex flex-col md:flex-row">
                <label htmlFor="" className="text-white font-semibold mr-2">
                  Cover Image
                </label>
                <input
                  type="file"
                  placeholder="Cover image"
                  name="coverImage"
                  className="h-10 bg-gray-200 text-black p-2 truncate w-[60vw] md:w-auto"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
              </Grid>
            </Grid>
            {isLoading ? (
              <div className=" flex justify-center items-center my-10">
                <BeatLoader color="rgba(54, 99, 214, 1)" />
              </div>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
