import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loginButton: {
    marginTop: 10,
  },
  loginForm: {
    margin: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  loginTitle: {
    fontWeight: 700,
    fontSize: 25,
    color: "blue",
  },
  paper: {
    margin: 30,
    height: "80vh",
  },
  paperContainer: {
    [theme.breakpoints.down('sm')]: {
      margin: "auto"
    },
    [theme.breakpoints.down('md')]: {
      margin: "auto"
    }
  },
  textInput: {
    marginBottom: 20,
  },
  homepage: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  homepageImage: {
    objectFit: "contain",
    width: 600,
    height: "72vh",
    marginTop: 25,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
}));

function Login({setNavbar}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const navigate = useNavigate()

  const handleLogin = () => {
    fetch("https://customdrive-backend.herokuapp.com/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
          if(data.name && data.email && data.jwtToken){
              alert("Login successful")
              setNavbar(true)
          }
          localStorage.setItem("token", data.jwtToken);
          localStorage.setItem("username", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("id", data.id)
          navigate("/dashboard")

      })
      .catch((error) => alert(error));
  };

  const handleGuest = () => {
    const email = process.env.REACT_APP_EMAIL
    const password = process.env.REACT_APP_PASSWORD
    fetch("https://customdrive-backend.herokuapp.com/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password  }),
    })
      .then((response) => response.json())
      .then((data) => {
          if(data.name && data.email && data.jwtToken){
              alert("Login successful")
              setNavbar(true)
          }
          localStorage.setItem("token", data.jwtToken);
          localStorage.setItem("username", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("id", data.id)
          navigate("/dashboard")

      })
      .catch((error) => alert(error));

  }

  return (
    <Grid container spacing={2} style={{ backgroundColor: "honeydew" }}>
      <Grid item xs={12} sm={12} lg={8} className={classes.homepage}>
        <Typography variant="h3">Welcome to your personal drive.</Typography>
        <img
          src="https://www.downloadclipart.net/large/backup-png-pic.png"
          alt="display-background"
          className={classes.homepageImage}
        />
      </Grid>
      <Grid item xs={10} sm={10} lg={4} className={classes.paperContainer}>
        <Paper elevation={4} className={classes.paper}>
          <form className={classes.loginForm}>
            <p className={classes.loginTitle}>Login</p>
            <TextField
              label="Email"
              type="email"
              variant="standard"
              className={classes.textInput}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
              label="Password"
              type="password"
              variant="standard"
              className={classes.textInput}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <Button
              variant="outlined"
              color="success"
              className={classes.loginButton}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="success"
              className={classes.loginButton}
              onClick={handleGuest}
            >
              Guest
            </Button>
          </form>
          <div>
            <Typography style={{ marginBottom: 20 }}>
              Don't have an account yet ?{" "}
              <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/register")}>
                Register.
              </span>
            </Typography>
            <Typography>
              Forgot password ?{" "}
              <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/forgot-password")}>
                Click here.
              </span>
            </Typography>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
