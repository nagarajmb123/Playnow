import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../store/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export default function SignIn() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const handleSubmit = async (event) => {
    setIsLoading(true);
    setError("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (data.get("email").trim() === "" || data.get("password").trim() === "") {
      setError("All fields are required");
    } else {
      try {
        const res = await axios.post(
          "https://playitnow-backend.playitnow.co/api/v1/users/login",
          {
            email: data.get("email"),
            password: data.get("password"),
          },
          {
            withCredentials: true,
          }
        );
        if (res?.status === 200) {
          console.log("success", res);
          dispatch(login(res?.data?.data?.user));
          setIsLoading(false);
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
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Container component="main" maxWidth="xs" className="text-white">
      <div>
        <Toaster />
      </div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            className="bg-gray-200"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className="bg-gray-200"
          />
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
              Sign In
            </Button>
          )}
          {/* {error && (
            <p className="text-2xl font-semibold text-red-600">{error}</p>
          )} */}
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
