import React, { useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  TableContainer,
} from "@mui/material";

const DynamicTable = ({ headers, data, rowsPerPageOptions = [5, 10, 25] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const headersKey = headers ? Object.keys(headers) : [];
  if (headersKey.length === 0 || data.length === 0) return null;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when data per page changes
  };

  // Slice the data to get only the data for the current page
  const paginatedRows = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ marginTop: "10px" }}>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        {" "}
        {/* Add scroll for small screens */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {headersKey.map((key, index) => (
                  <TableCell key={index} sx={{ fontWeight: "bold" }}>
                    {headers[key]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5", // Hover effect background color
                      cursor: "pointer", // Pointer cursor on hover
                    },
                  }}
                >
                  {headersKey.map((header, headerIndex) => {
                    return (
                      <TableCell key={headerIndex}>{row[header]}</TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 0",
          alignItems: "center",
        }}
      />
    </Paper>
  );
};

export default DynamicTable;
