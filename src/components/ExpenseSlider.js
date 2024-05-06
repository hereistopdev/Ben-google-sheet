import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { TextField } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 1;

export default function ExpenseSlider({ value1, setValue1, min, max }) {
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const onStartChange = (e) => {
    const arr = [e.target.value, value1[1]];
    setValue1(arr);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Box sx={{ margin: "10px", width: "150px", fontWeight: "bolder" }}>
          Expense :{" "}
        </Box>
        <TextField
          value={value1[0]}
          onChange={(e) => setValue1([e.target.value, value1[1]])}
          label="min"
          size="small"
        ></TextField>

        <Slider
          min={min}
          max={max}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          disableSwap
          sx={{ margin: "0px 20px" }}
        />
        <TextField
          value={value1[1]}
          onChange={(e) => setValue1([value1[0], e.target.value])}
          label="max"
          size="small"
        ></TextField>
      </Box>
    </Box>
  );
}
