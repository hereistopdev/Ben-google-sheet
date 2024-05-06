import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  list = [],
  label = "Select",
  func,
  value,
}) {
  const handleChange = (event) => {
    func(event.target.value);
  };

  return (
    <FormControl style={{ minWidth: 150 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {list.map((v, i) => {
          return (
            <MenuItem value={i} key={i}>
              {v}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
