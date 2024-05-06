import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DateRange } from "@mui/icons-material";
import ExpenseSlider from "./ExpenseSlider";
import { Box } from "@mui/material";
import SearchInput from "./SearchInput";

export default function DataTable({ data }) {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [expenseMax, setExpenseMax] = React.useState(-99999);
  const [expenseMin, setExpenseMin] = React.useState(99999);
  const [range, setRange] = React.useState([0, 100]);
  const [keyword, setKeyword] = React.useState([""]);

  React.useEffect(() => {
    if (data.length) {
      const temp = [];
      Object.keys(data[0]).map((v) => {
        temp.push({ field: v, headerName: v });
      });
      setColumns(temp);
      const temp_row = [];
      let maxV = -99999;
      let minV = 99999;
      data.map((v, i) => {
        const obj = {};
        temp.map((vv) => {
          obj[vv.field] = v[vv.field];

          if (vv.field === "Expense" && Number(v[vv.field]) > maxV) {
            maxV = Number(v[vv.field]);
          }

          if (vv.field === "Expense" && Number(v[vv.field]) < minV) {
            minV = Number(v[vv.field]);
          }
        });
        temp_row.push({ ...obj, id: i });
      });
      setRows(temp_row);
      setFiltered(temp_row);
      setExpenseMax(Number(maxV));
      setExpenseMin(Number(minV));
      setRange([minV, maxV]);
    }
  }, [data]);

  React.useEffect(() => {
    const temp = rows
      .filter((v) => {
        const temp = Object.values(v);
        let flag = false;
        temp.map((val) => {
          // String("1").to
          if (val && val.toString().toLowerCase().indexOf(keyword) !== -1) {
            flag = true;
          }
        });
        return flag;
      })
      .filter((v) => {
        if (v["Expense"] >= range[0] && v["Expense"] <= range[1]) return true;
        else return false;
      });
    setFiltered(temp);
  }, [range, keyword]);

  return (
    <div style={{ height: "calc(100vh - 260px)", padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ExpenseSlider
          value1={range}
          setValue1={setRange}
          min={expenseMin}
          max={expenseMax}
        />
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
      </Box>
      <DataGrid
        rows={filtered}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 100]}
        checkboxSelection
        density="compact"
      />
    </div>
  );
}
