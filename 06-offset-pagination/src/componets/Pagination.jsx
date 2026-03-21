import React, { useEffect, useMemo } from "react";
import "../App.css";

function Pagination(props) {
  const totalPages = Math.ceil(props.totalProducts / props.limit);
  const maxVisible = 11;

  const pages = useMemo(() => {
    const pageArray = [];
    const half = Math.floor(maxVisible / 2);
    let start = props.currentPage - half;
    let end = props.currentPage + half;
    if (start <= 1) {
      start = 1;
      end = Math.min(totalPages, maxVisible);
    }
    if (end >= totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    for (let i = start; i < end + 1; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }, [props.totalProducts, props.limit, props.currentPage]);

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
