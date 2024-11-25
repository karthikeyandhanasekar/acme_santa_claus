import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [navMenuAnchorEl, setNavMenuAnchorEl] = React.useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleUserMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);

  const handleNavMenuOpen = (event) => setNavMenuAnchorEl(event.currentTarget);
  const handleNavMenuClose = () => setNavMenuAnchorEl(null);

  const isToken = sessionStorage.getItem("employeeToken");

  const navItems = [
    { label: "Home", path: "/" },
    // { label: "Login", path: "/login" },
    { label: "Santa Claus", path: "/santaClaus" },
  ];

  const onLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    handleUserMenuClose();
    setTimeout(() => {
      navigate("/login");
    }, [1000]);
  };

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Acme
        </Typography>

        {/* Navigation (hidden in mobile, visible otherwise) */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Desktop Navigation Buttons */}
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                color={
                  location.pathname === item.path ? "secondary" : "inherit"
                } // Highlight active link
                sx={{
                  textTransform: "none", // Disable uppercase
                  color: "#ffffff",
                  fontWeight:
                    location.pathname === item.path ? "bold" : "normal", // Bold active link
                  "&:hover": {
                    bgcolor: theme.palette.action.hover, // Add subtle hover effect
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <>
            {/* Mobile Menu Icon */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleNavMenuOpen}
              aria-label="menu"
              sx={{
                ml: 1,
                color: "white", // Ensures the icon is visible
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Dropdown Menu */}
            <Menu
              anchorEl={navMenuAnchorEl}
              open={Boolean(navMenuAnchorEl)}
              onClose={handleNavMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                mt: 5, // Add margin to avoid overlap with the AppBar
                minWidth: "200px", // Adjust the menu width for better usability
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item}
                  component={NavLink} // Use NavLink as the component
                  to={item.path} // Path for the navigation
                  onClick={() => {
                    handleNavMenuClose();
                  }}
                  sx={{
                    color: "black", // Set text color
                    textDecoration: "none", // Remove underline
                    "&:hover": {
                      bgcolor: "primary.light", // Highlight menu items on hover
                    },
                    "&.active": {
                      fontWeight: "bold", // Highlight active link
                      color: "primary.main",
                    },
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
        {/* User Icon with Dropdown Menu */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleUserMenuOpen}
          aria-label="user menu"
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
          sx={{
            p: 0, // Removes any unintended padding inside the menu
            mt: 1, // Add spacing below the anchor element
          }}
        >
          <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
          <MenuItem onClick={onLogOut}>{isToken ? "Logout" : "Login"}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
