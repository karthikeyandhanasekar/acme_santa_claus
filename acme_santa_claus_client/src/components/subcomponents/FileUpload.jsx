import React, { useState, useRef } from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

const DragAndDropFile = ({ file, setFile, accept = ".csv" }) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(); // Ref for the file input
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  return (
    <Paper
      elevation={dragging ? 6 : 3}
      sx={{
        border: dragging ? "2px dashed #1976d2" : "2px dashed #ccc",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        backgroundColor: dragging ? "#f1f1f1" : "#f9f9f9",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#f1f1f1" },
      }}
      onClick={handleClick} // Handle click anywhere in the container
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {!file ? (
        <Box>
          <CloudUploadIcon
            sx={{ fontSize: 50, color: dragging ? "#1976d2" : "#ccc" }}
          />
          <Typography variant="body2" color="textSecondary">
            Drag & drop your file here, or click to browse
          </Typography>
          <input
            ref={fileInputRef} // Attach the ref to the file input
            type="file"
            accept={accept}
            hidden
            onChange={handleFileChange}
          />
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center">
          <UploadFileIcon sx={{ fontSize: 40, color: "#4caf50" }} />
          <Typography variant="body1" sx={{ marginLeft: "10px" }}>
            {file.name}
          </Typography>
          <IconButton
            aria-label="remove"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the file input when removing
              handleRemoveFile();
            }}
            sx={{ marginLeft: "10px", color: "red" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default DragAndDropFile;
