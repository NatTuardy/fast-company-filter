import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ number }) => {
  const people = () => {
    return (number === 2 || number === 3 || number === 4) ? "человека" : "человек";
  };

  return (
    <h4>
      <span className="badge m-2 h-12 bg-primary">{`${number} ${people()} тусанет с тобой сегодня`}</span>
    </h4>
  );
};

SearchStatus.propTypes = {
  number: PropTypes.number.isRequired,
};

export default SearchStatus;
