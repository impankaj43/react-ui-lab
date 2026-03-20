import React from "react";
import "../App.css";

function Pagination(props) {
  const pages = [];
  const totalPages = Math.ceil(props.totalProducts / props.limit);
  for (let i = 1; i < totalPages + 1; i++) {
    pages.push(i);
  }
  return (
    <div className="pagination-section">
      <button
        onClick={() => props.handlePageChange(props.currentPage - 1)}
        style={{
          backgroundColor: "#e0e0e0",
        }}
        disabled={props.currentPage < 2}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          onClick={() => props.handlePageChange(page)}
          style={{
            fontWeight: props.currentPage == page ? "bold" : "normal",
            backgroundColor: props.currentPage === page ? "#e0e0e0" : "white",
          }}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => props.handlePageChange(props.currentPage + 1)}
        disabled={props.currentPage == totalPages}
        style={{
          backgroundColor: "#e0e0e0",
        }}
      >
        Next
      </button>
    </div>
  );
}

export default React.memo(Pagination);
