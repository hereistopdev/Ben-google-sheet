import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, ButtonGroup, IconButton, TextField } from "@mui/material";
import BasicSelect from "./selectBox";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

export default function BasicTable({ vals, setVals, presents, actives }) {
  const [isEdit, setIsEdit] = React.useState(-1);

  const [activeStatus, setActiveStatus] = React.useState("");

  const [topic, setTopic] = React.useState("");
  const [mentioned, setMentioned] = React.useState("");
  const [seconded, setSeconded] = React.useState("");

  const init = () => {
    setTopic("");
    setMentioned("");
    setSeconded("");
    setActiveStatus("");
  };

  const onAdd = () => {
    const temp = { topic, mentioned, seconded, activeStatus };
    setVals([...vals, temp]);
    init();
  };

  const onDelete = (id) => {
    const temp = vals.filter((v, i) => i !== id);
    setVals(temp);
  };

  const onEdit = (id) => {
    const temp = vals[id];
    setTopic(temp.topic);
    setMentioned(temp.mentioned);
    setActiveStatus(temp.activeStatus);
    setSeconded(temp.seconded);
    setIsEdit(id);
  };

  const onUpdate = (id) => {
    const temp = { topic, mentioned, seconded, activeStatus };
    setVals(vals.map((v, i) => (i !== id ? v : temp)));
    init();
    setIsEdit(-1);
  };

  return (
    <>
      <TableContainer style={{ padding: 20 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width={10}>
                #
              </TableCell>
              <TableCell align="center">Topic</TableCell>
              <TableCell align="center">Motioned by</TableCell>
              <TableCell align="center">Seconded by</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Edit/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vals.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.topic}</TableCell>
                <TableCell align="center">{presents[row.mentioned]}</TableCell>
                <TableCell align="center">{presents[row.seconded]}</TableCell>
                <TableCell align="center">
                  {actives[row.activeStatus]}
                </TableCell>
                <TableCell align="center">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                  >
                    <IconButton onClick={() => onEdit(index)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => onDelete(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box padding={2} display={"flex"} justifyContent={"center"} gap={2}>
        <TextField
          label="Topic"
          style={{ width: 300 }}
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
        />
        <BasicSelect
          list={presents}
          value={mentioned}
          func={setMentioned}
          label="Mentioned By"
        />
        <BasicSelect
          list={presents}
          value={seconded}
          func={setSeconded}
          label="Seconded By"
        />
        <BasicSelect
          list={actives}
          value={activeStatus}
          func={setActiveStatus}
          label="Active"
        />
        {isEdit === -1 ? (
          <Button style={{ width: 100 }} variant="contained" onClick={onAdd}>
            <AddIcon />
            Add
          </Button>
        ) : (
          <Button
            style={{ width: 100 }}
            variant="contained"
            onClick={() => onUpdate(isEdit)}
            color="secondary"
          >
            <SaveIcon />
            Update
          </Button>
        )}
      </Box>
    </>
  );
}
