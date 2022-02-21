import { Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Upload() {
  const [value, setValue] = useState();
  const [id, setId] = useState();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setId(localStorage.getItem("id"));
  });

  const handleChange = (files) => {
    /* it avoids to call setValue when DropzoneArea 
       is initialized with empty values */
    if (!(!value && files.length === 0)) {
      setValue(files[0]);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();

    formData.append("file", value);
    setIsloading(true);
    fetch(`https://customdrive-backend.herokuapp.com/api/upload/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        
        alert(data.message);
        setIsloading(false)
      })
      .catch((error) => console.log(error));
  };
  return (
    <form
      style={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        marginTop: 50,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
        <div>&nbsp;</div><div>&nbsp;</div> Uploading
      </Backdrop>
      <div style={{ marginLeft: 50, marginBottom: 30 }}>
        <DropzoneArea onChange={handleChange} filesLimit={1} />
      </div>
      <Button
        variant="contained"
        style={{ width: 80, margin: "auto" }}
        onClick={handleUpload}
      >
        Upload
      </Button>
    </form>
  );
}

export default Upload;
