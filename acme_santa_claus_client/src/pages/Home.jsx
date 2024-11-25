import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.light",
          color: "white",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to Acme's Secret Santa!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Celebrate the spirit of giving and surprise your colleagues with a
            thoughtful gift.
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              bgcolor: "secondary.main",
              color: "white",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Step 1
                </Typography>
                <Typography variant="body1">
                  Sign up for the Secret Santa event using your company email.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Step 2
                </Typography>
                <Typography variant="body1">
                  Get matched with a colleague as your Secret Child.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Step 3
                </Typography>
                <Typography variant="body1">
                  Choose a thoughtful gift and surprise them during the event.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "primary.dark",
          color: "white",
          py: 4,
          mt: 6,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Acme Corporation. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Home;
