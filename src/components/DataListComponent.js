import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";

const PaginationComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search, data]);

  const handleSortByID = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortOrder === "asc") {
          return b.id - a.id;
        } else {
          return a.id - b.id;
    }
    });
  
    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortByTitle = () => {
    const sortedData = [...filteredData].sort((a, b) => {
        debugger
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pagination with Search & Sorting</h2>

      <TextField
        label="Search Title"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> ID
              <TableSortLabel
                  active
                  direction={sortOrder}
                  onClick={handleSortByID}
                />
                 </TableCell>
              <TableCell>
                Title
                <TableSortLabel
                  active
                  direction={sortOrder}
                  onClick={handleSortByTitle}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <TextField
          select
          label="Items per page"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          sx={{ width: "120px" }}
        >
          {[5, 10, 20].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
