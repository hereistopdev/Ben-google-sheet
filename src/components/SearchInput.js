import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchInput({ keyword, setKeyword }) {
  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      onChange={(e) => setKeyword(e.target.value)}
      size="small"
    />
  );
}
