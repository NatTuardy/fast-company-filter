import React from "react";
import PropTypes from "prop-types";
const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {Array.isArray(items) ? items.map((item) => (
        <li
          className={"list-group-item" + (item === selectedItem ? " active" : "")}
          role="button"
          key={item._id}
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      )
      ) : Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          role="button"
          onClick={() => onItemSelect(items[item])}
          className={"list-group-item" + (items[item] === selectedItem ? " active" : "")
          }
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name",
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object.isRequired,
};
export default GroupList;
