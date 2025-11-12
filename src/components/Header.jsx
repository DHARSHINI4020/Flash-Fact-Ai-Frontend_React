import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ColorModeContext } from "../context/ThemeContext"; // ✅ Import context

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.05)",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          FlashFact AI
        </Typography>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/saved">
            Saved
          </Button>

          {!user ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/profile">
                {user.username || "Profile"}
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {/* 🌗 Dark/Light Mode Toggle */}
          <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            sx={{
              ml: 1,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
              transition: "background 0.3s ease",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
              },
            }}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
