import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useLoading } from "../components/Loading/loadingProvider";
import { useNavigate } from "react-router-dom";
import { loginController } from "../controllers/authenticationController";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Validation Schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address"
    ),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "spencer.allen@acme.com",
      password: "Welcome@123",
    },
  });
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const [apiStatus, setAPIStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      startLoading();
      const response = await loginController(data);
      setAPIStatus({
        ...response,
        message: "Login successful",
      });
      sessionStorage.setItem("employeeToken", response.jwtToken);
      setTimeout(() => {
        navigate("/santaClaus");
      }, [2000]);
    } catch (error) {
      console.error(error);
      setAPIStatus({
        ...error,
      });
    } finally {
      stopLoading();
    }
  };

  const handleCancel = () => {
    reset(); // Clears the form fields
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {/* Display Errors */}
        {apiStatus && (
          <Alert
            severity={apiStatus.success ? "success" : "error"}
            sx={{ mt: 2 }}
          >
            {apiStatus?.message || apiStatus?.errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email Field */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle between text and password
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            display={"flex "}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              pointerEvents: "none",
              cursor: "not-allowed",
            }}
          >
            {/* Remember Me Checkbox */}
            <FormControlLabel
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => <Checkbox {...field} value={true} />}
                />
              }
              label="Remember Me"
            />

            {/* Forgot Password Link */}
            <Box textAlign="right" sx={{ mt: 1 }}>
              <Link href="/forgot-password" underline="hover" variant="body2">
                Forgot Password?
              </Link>
            </Box>
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Login
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </form>

        {/* Don't Have an Account */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Link href="/register" underline="hover">
              Create one
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
