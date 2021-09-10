import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ length, pageSize, onPage, currentPage = 1 }) => {
  const listPageSize = Math.round(length / pageSize);
  if (listPageSize === 1) return null;
  const listPage = new Array(listPageSize).fill(0).map((e, i) => i + 1);

  return (
    <nav>
      <ul className="pagination">
        {listPage.map((item) => (
          <li
            className={currentPage === item ? "page-item active" : "page-item"}
            key={item}
            onClick={() => onPage(item)}
          >
            <a className="page-link">{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  length: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
