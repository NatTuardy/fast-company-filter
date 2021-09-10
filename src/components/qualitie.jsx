import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name }) => {
  const getBadgeclasses = (color) => {
    let classes = "badge bg-";
    classes += color;
    return classes;
  };

  return (
    <>
      <span className={getBadgeclasses(color)}>{name}</span>
    </>
  );
};

Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Qualitie;
