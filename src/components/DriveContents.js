import { Card, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import InsertDriveFileTwoToneIcon from "@mui/icons-material/InsertDriveFileTwoTone";

function DriveContents() {
  const [data, setData] = useState();
  const email = localStorage.getItem("email");

  const getData = async () => {
    await fetch(
      `https://customdrive-backend.herokuapp.com/dashboard/user-dashboard-details/${email}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDownload = (file) => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
    fetch(`https://customdrive-backend.herokuapp.com/api/download/${file}`, requestOptions)
      .then((response) => response.arrayBuffer().then(function(buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      ).catch(error => console.log(error))
  };

  return (
    <div>
      <Typography style={{ float: "left", margin: 30 }} variant="h5">
        Files
      </Typography>
      <Grid spacing={2} container>
        {data
          ? data.files.map((file, index) => (
              <Grid item lg={3} md={4} sm={6} key={index}>
                <Card
                  key={index}
                  style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                  onClick={() => handleDownload(file)}
                >
                  <InsertDriveFileTwoToneIcon />
                  {file}
                </Card>
              </Grid>
            ))
          : ""}
      </Grid>
      <Typography style={{ float: "left", margin: 30 }} variant="h5">
        Folders
      </Typography>
      <Grid spacing={2} container>
        {data
          ? data.folders.map((folder, index) => (
              <Grid item lg={3} md={4} sm={6} key={index}>
                <Card
                  key={index}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <FolderTwoToneIcon /> {folder}
                </Card>
              </Grid>
            ))
          : ""}
      </Grid>
    </div>
  );
}

export default DriveContents;
