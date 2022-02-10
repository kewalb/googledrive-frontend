import React from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Grid from "@mui/material/Grid";
import { makeStyles, Paper } from "@material-ui/core";
import { Button, Typography } from "@mui/material";
import Upload from "./Upload";
import CreateFolder from "./CreateFolder";
import DriveContents from "./DriveContents";

const useStyle = makeStyles((theme) => ({
  leftBorder: {},
  sideNav: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    height: "92vh",
  },
  uploadBtn: {
    margin: 30,
  },
}));

function Dashboard({match}) {
  const classes = useStyle();
  const navigate = useNavigate()
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} lg={3} md={3} className={classes.leftBorder}>
        <Paper className={classes.sideNav} elevation={5}>
          <Button variant="outlined" className={classes.uploadBtn} onClick={() => navigate(`upload`)}>
            <Typography variant="h5">Upload</Typography>
          </Button>
          <span>OR</span>
          <Button variant="outlined" className={classes.uploadBtn} onClick={() => navigate(`create-folder`)}>
            <Typography variant="h5">Create folder</Typography>
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={8}>
       
        <Routes>
            <Route path='/' element={<DriveContents />} />
            <Route path={`upload`} element={<Upload />} />
            <Route path={`create-folder`} element={<CreateFolder />} />
        </Routes>
        
      </Grid>
    </Grid>
  );
}

export default Dashboard;
