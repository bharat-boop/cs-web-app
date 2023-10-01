import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { agentLogin, clientLogin } from "../axios/axios";
import Cookies from "universal-cookie";
import { Alert } from "@mui/material";

const defaultTheme = createTheme();

const Login = () => {
  const [err, setErr] = useState("");
  const cookies = new Cookies(null, { path: "/" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (type === 0) {
      const login = await clientLogin(
        data.get("username"),
        data.get("password")
      );
      if (login.status === "not ok") {
        setErr(login.msg);
      } else {
        window.location.href = "/";
      }
    } else {
      const login = await agentLogin(
        data.get("username"),
        data.get("password")
      );
      if (login.status === "not ok") {
        setErr(login.msg);
      } else {
        window.location.href = "/agent";
        cookies.set("token", login.token, { path: "/" });
      }
    }
  };
  const [type, setType] = useState(0);
  let error = null;
  if (err) {
    error = <Alert severity="error">{err}</Alert>;
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
              {error}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Select
                value={type}
                label="Type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <MenuItem value={0}>Client</MenuItem>
                <MenuItem value={1}>Agent</MenuItem>
              </Select>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
