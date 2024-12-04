import { Pagination, Stack } from "@mui/material";
import React from "react";

const PaginationRounded = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };
  return (
    <Stack spacing={1} direction="row" justifyContent="center">
      <Pagination
        count={totalPages} 
        shape="rounded" 
        page={currentPage}
        onChange={(event, pageNumber) => handlePageClick(pageNumber)} 
        variant="outlined" 
        color="primary" 
      />
    </Stack>
  );
};
export default PaginationRounded;
