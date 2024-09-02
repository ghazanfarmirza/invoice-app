// Header.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface HeaderProps {
  onSave: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSave, onReset }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          New Invoice
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "gray" }}>
          Create new invoice for your customers
        </Typography>
      </Box>
      <Box>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onReset}
          sx={{ marginRight: 2 }}
        >
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
