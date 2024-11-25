import React from "react";
import {
  Dialog,
  DialogActions,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";
import { useAccessDeniedDialog } from "./AccessDeniedProvider";

const AccessDeniedDialog = () => {
  const { dialogState, closeDialog } = useAccessDeniedDialog();
  const { open, title, message, IconComponent } = dialogState;
  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth>
      {/* Header Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          display={"flex"}
          alignItems={"center"}
          color="error"
        >
          {/* Icon */}
          {IconComponent ? (
            <IconComponent
              style={{ fontSize: 30, marginRight: "20px", color: "#f44336" }}
            />
          ) : (
            <WarningAmberIcon
              style={{ fontSize: 30, marginRight: "20px", color: "#f44336" }}
            />
          )}
          {title || "Access Denied"}
        </Typography>
        <IconButton onClick={closeDialog} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Icon and Message Section */}
      <Box px={3} py={2}>
        {/* Message */}
        <Typography variant="body1" color="textSecondary">
          {message || "You don't have permission to access this resource."}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <DialogActions>
        <Button
          onClick={closeDialog}
          variant="contained"
          color="primary"
          size="large"
          style={{
            margin: "0 auto",
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          Okay, Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccessDeniedDialog;
