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
  Link,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { employeeRegistrationController } from "../controllers/authenticationController";
import { useLoading } from "../components/Loading/loadingProvider";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Validation Schema using Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [apiStatus, setAPIStatus] = useState(null);
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const onSubmit = async (data) => {
    try {
      startLoading();
      const response = await employeeRegistrationController(data);
      setAPIStatus({
        ...response,
        message: "Registration successful",
      });
      setTimeout(() => {
        navigate("/login");
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
  const handleTogglePassword1 = () => {
    setShowPassword1((prev) => !prev);
  };

  return (
    <Container maxWidth="md">
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
          Registration
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
          <Grid container spacing={2}>
            {/* Name Field */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            {/* Mobile Number Field */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Mobile Number"
                fullWidth
                margin="normal"
                {...register("mobile")}
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12} sm={6} md={6}>
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
            </Grid>

            {/* Confirm Password Field */}
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Confirm Password"
                type={showPassword1 ? "text" : "password"} // Toggle between text and password
                fullWidth
                margin="normal"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword1} edge="end">
                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12} sm={6} md={6}>
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
                Register
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Already Have an Account */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
