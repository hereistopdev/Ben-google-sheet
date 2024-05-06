import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import DataTable from "./DataTable";
import { Box, Button } from "@mui/material";

function MainComp() {
  const [sheetData, setSheetData] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    readExcel(file);
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((data) => {
      setSheetData(data);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop an Excel file here, or click to select one</p>
        </Box>
        {/* <Box>
          <Button sx={{ height: "100%" }} color="primary" variant="contained">
            Export
          </Button>
        </Box> */}
      </Box>
      {uploadedFile && (
        <Box>
          <p>Uploaded file: {uploadedFile.name}</p>
          {/* You can display additional information about the file here */}
        </Box>
      )}
      {/* <h2>Excel Data</h2> */}
      <DataTable data={sheetData} />
    </Box>
  );
}

const dropzoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "0px 20px",
  textAlign: "center",
  cursor: "pointer",
};

export default MainComp;
