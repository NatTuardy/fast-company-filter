import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
  return (
    <>
      {users.map((user) => (
        <User key={user._id} {...user} {...rest} />
      ))}
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Users;
