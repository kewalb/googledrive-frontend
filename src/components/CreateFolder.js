import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Typography } from "@material-ui/core";

function CreateFolder() {
  const [folderName, setFolderName] = useState("");
  const id = localStorage.getItem("id")
  const handleCreate = () => {
    fetch(`http://localhost:9000/api/create-folder/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: folderName }),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message))
      .catch((error) => console.log(error));
  };

  return (
    <form
      style={{
        margin: 60,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <Typography variant="h4" style={{ marginBottom: 30 }}>
        Enter folder name
      </Typography>
      <TextField
        label="Enter Folder Name"
        variant="filled"
        style={{ marginBottom: 30 }}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "auto", width: 100 }}
        onClick={handleCreate}
      >
        Create
      </Button>
    </form>
  );
}

export default CreateFolder;
