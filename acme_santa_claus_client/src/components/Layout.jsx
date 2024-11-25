import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";
import Header from "./Header";
import ApplicationRoutes from "./Router";

const ResponsiveLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Layout Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflowX: "hidden", // Prevent horizontal overflow
        }}
      >
        <Box sx={{ padding: 1 }}>
          <ApplicationRoutes />
        </Box>

        {/* Footer */}
        {/* <Box
          component="footer"
          sx={{
            flexShrink: 0,
            py: 2,
            bgcolor: "primary.main",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">Responsive Footer</Typography>
        </Box> */}
      </Box>
    </>
  );
};

export default ResponsiveLayout;
