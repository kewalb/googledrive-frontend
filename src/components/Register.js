import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const useStyle = makeStyles((theme) => ({
  registerForm: {
    margin: 40,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  registerBtn: {
    margin: "auto",
    marginTop: 30,
    width: "130px",
    height: "50px",
  },
  textInput: {
    marginBottom: 20,
  },
}));

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()
  const classes = useStyle();

  const handleRegister = () => {
      if(password !== confirmPassword){
          if(!password && !email && !name && !confirmPassword){
              alert("Please fill in all fields")
          }
          alert("Password did not match please try again")
      }
      else{
      fetch("http://localhost:9000/user/signup", {
          method: "POST",
          headers:{
              "content-type": "application/json"
          },
          body: JSON.stringify({
              name, email, password
          })
      }).then(response => response.json()).then(data => alert(data.message)).catch(error => console.log(error))
    }
  }

  return (
    <form className={classes.registerForm}>
      <Typography variant="h4" color="primary" style={{ marginBottom: 20 }}>
        Create a new account and it's free.
      </Typography>
      <TextField
        label="Enter your name"
        type="text"
        fullWidth
        className={classes.textInput}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Enter your email"
        type="email"
        fullWidth
        className={classes.textInput}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Enter a password"
        type="password"
        fullWidth
        className={classes.textInput}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirm password"
        type="password"
        fullWidth
        className={classes.textInput}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.registerBtn}
        onClick={handleRegister}
      >
        Register
      </Button>
      <div style={{marginTop: 30}}>
          <Typography variant="h6">Already have an account ? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/")}>Login.</span></Typography>
      </div>
    </form>
  );
}

export default Register;
