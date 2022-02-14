import { Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";

function Upload() {
  //   const file = useRef();
  const [value, setValue] = useState();
  const [id, setId] = useState()
  const handleChange = (files) => {
    /* it avoids to call setValue when DropzoneArea 
       is initialized with empty values */
    if (!(!value && files.length === 0)) {
      setValue(files[0]);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    setId(localStorage.getItem("id"))
    formData.append("file", value);
    
    fetch(`https://customdrive-backend.herokuapp.com/api/upload/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => alert(data.message))
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
