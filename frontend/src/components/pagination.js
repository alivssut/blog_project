import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);

    if (totalPages <= 1) {
      return range;
    }

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < totalPages && i > 1) {
        range.push(i);
      }
    }

    range.push(totalPages);

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const handlePageChange = (page) => {
    if (page === '...') {
      return;
    }
    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(1)}
        >
          First
        </button>
      </li>

      <li
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      </li>

      {getPageNumbers().map((page, index) => (
        <li
          key={index}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </li>

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(totalPages)}
        >
          Last
        </button>
      </li>
    </ul>
  );
};

function  PaginationComponent (props) {
  const [currentPage, setCurrentPage] = useState(parseInt(props.currentPage));
  const totalPages = Math.ceil(props.count / 5);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    navigate("/posts?page="+page);
    setCurrentPage(page);
    navigate(0);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;