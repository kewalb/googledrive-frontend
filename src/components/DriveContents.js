import { Card, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

function DriveContents() {
    const [data, setData] = useState({})
  const [files, setFiles] = useState();
  const [folders, setFolders] = useState();
  const email = localStorage.getItem("email");

  const getData = async () => {
    await fetch(`http://localhost:9000/dashboard/user-dashboard-details/${email}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setData(data)
      // if (data.files) {
      //   setFiles(data.files);
      // }
      // if (data.folders) {
      //   setFolders(data.folders);
      // }
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(data);

  return (
    <Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography style={{ float: "left", margin: 30 }} variant="h5">
          Files
        </Typography>
      </Grid>
      <Grid item lg={3} md={4} sm={6} style={{ display: "flex" }}>
        {data.files.map((file, index) => (
          <Card key={index}>{file}</Card>
        ))}
      </Grid>
    </Grid>
  );
}

export default DriveContents;
