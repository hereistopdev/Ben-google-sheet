import "./App.css";
import BasicTable from "./components/table";
import Docx from "./components/docx";
import { Box, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import BasicDateTimePicker from "./components/dateTimePicker";
import dayjs from "dayjs";
import Agenda from "./components/agenda";

function App() {
  const [vals, setVals] = React.useState([]);
  const actives = ["Approved", "Denied", "Tabled", "Removed from the table"];

  const [date, setDate] = useState(dayjs(new Date()));
  const [presents, setPresents] = useState(["AAA", "BBB", "CCC"]);
  const [absent, setAbsent] = useState([]);

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvt) => {
        setImage(readerEvt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Card style={{ width: "70%", padding: 20 }}>
          <Box gap={2} display={"flex"} justifyContent={"center"}>
            <TextField
              label="Present Names"
              defaultValue={"AAA,BBB,CCC"}
              onChange={(e) => {
                const val = e.target.value;
                const temp = val.split(",");
                setPresents(temp);
              }}
            />

            <TextField
              label="Absent Names"
              onChange={(e) => {
                const val = e.target.value;
                const temp = val.split(",");
                setAbsent(temp);
              }}
            />
          </Box>
          <BasicDateTimePicker date={date} setDate={setDate} />
          <BasicTable
            vals={vals}
            setVals={setVals}
            presents={presents}
            actives={actives}
          />
          <Box display={"flex"} gap={2} justifyContent={"center"}>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <Docx
              title="Minutes"
              presents={presents}
              absent={absent}
              image={image}
              data={vals}
              actives={actives}
            />
            <Agenda
              title="Agenda"
              presents={presents}
              absent={absent}
              image={image}
              data={vals}
              actives={actives}
            />
          </Box>
        </Card>
      </header>
    </div>
  );
}

export default App;
