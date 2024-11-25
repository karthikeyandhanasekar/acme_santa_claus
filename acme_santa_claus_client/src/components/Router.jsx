import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Lazy load components
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const GenerateSantaClaus = lazy(() => import("../pages/generateSantaClaus"));

const Loading = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

const ApplicationRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/santaClaus" element={<GenerateSantaClaus />} />
      </Routes>
    </Suspense>
  );
};

export default ApplicationRoutes;
