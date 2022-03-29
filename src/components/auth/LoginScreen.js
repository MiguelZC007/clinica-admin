import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { loginform } from "../../actions/auth";
import { setError, removeError } from "../../actions/ui";
import validator from "validator";
import { MainContext } from "../../contexts/MainContext";
import Logo from "../../assets/logo.webp";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { MenuItem, Select } from "@mui/material";

const theme = createTheme();

export const LoginScreen = () => {
  let rl = localStorage.getItem("url")
    ? localStorage.getItem("url")
    : process.env.REACT_APP_URL;
  const { loading } = useSelector((state) => state.ui);
  const { setLoading } = React.useContext(MainContext);
  const { url } = React.useState(rl);
  const dispatch = useDispatch();

  console.log("antes", rl);

  const [formValues, handleInptChange] = useForm({
    email: "admin@gmail.com",
    password: "123456",
  });

  const { email, password } = formValues;

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    if (formValidator()) {
      dispatch(loginform(email, password));
    }
    setLoading(false);
  };

  const formValidator = () => {
    if (password.length === 0) {
      dispatch(setError("no password"));
      return false;
    } else {
      if (!validator.isEmail(email)) {
        dispatch(setError("email incorrecto"));
        return false;
      }
    }
    dispatch(removeError());
    return true;
  };

  const onChangeServer = ({ target }) => {
    console.log(target);
    localStorage.setItem("url", target.value);
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Logo})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "contain",
            backgroundPosition: "left",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            <Select
              style={{
                margin: "5px 10%",
              }}
              fullWidth
              id="url"
              name="url"
              value={url}
              label="URL"
              onChange={onChangeServer}
            >
              <MenuItem value={"http://192.168.1.18:3001/"}>{"Local"}</MenuItem>
              <MenuItem value={"http://158.101.9.239:3001/"}>
                {"Develop"}
              </MenuItem>
              <MenuItem value={"http://158.101.9.239:3002/"}>
                {"Testing"}
              </MenuItem>
            </Select>
            <Typography component="h1" variant="h5">
              Iniciar Sesion
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleInptChange}
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
                value={password}
                onChange={handleInptChange}
              />
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesion
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
