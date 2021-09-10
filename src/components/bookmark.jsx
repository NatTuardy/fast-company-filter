import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, onToggle, id }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-info btn-sm"
        onClick={() => onToggle(id)}
      >
        <i className={status ? "bi bi-trophy-fill" : "bi bi-trophy"}></i>
      </button>
    </>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default BookMark;
