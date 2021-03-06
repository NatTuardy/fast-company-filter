import React, { useState, useEffect } from "react";
import Users from "./components/users.jsx";
import SearchStatus from "./components/searchStatus";
import api from "./api";
import Pagination from "./components/pagination.jsx";
import { paginate } from "./utils/paginate";
import GroupList from "./components/groupList.jsx";

const App = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  useEffect(() => {
    api.users.fetchAll().then((date) => setUsers(date));
    api.professions.fetchAll().then((date) => setProfessions(date));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    const newArr = users.map((user) =>
      user._id === id ? { ...user, status: !user.status } : user
    );
    setUsers(newArr);
  };

  const handleProfessionsSelect = (item) => {
    setSelectedProf(item);
  };

  // pagination
  const pageSize = 2;
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  let filterUsers;
  let lengthUser;
  let userCrop;
  if (users) {
    if (Array.isArray(professions)) {
      filterUsers = selectedProf ? users.filter((user) => {
        return user.profession.name === selectedProf.name;
      }) : users;
    } else {
      filterUsers = selectedProf ? users.filter((user) => {
        console.log("user:", user.profession, "select:", selectedProf, JSON.stringify(user.profession) === JSON.stringify(selectedProf));
        return JSON.stringify(user.profession) === JSON.stringify(selectedProf);
      }) : users;
    }
    lengthUser = filterUsers.length;
    userCrop = paginate(filterUsers, currentPage, pageSize);
  }
  const clearFilter = () => {
    setSelectedProf();
  };

  const renderTable = () => {
    return (
      <>
        <div className="d-flex">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionsSelect}
              />
              <button onClick={clearFilter} className="btn btn-secondary mt-2">
                ????????????????
              </button>
            </div>
          )}
          <div className="d-flex flex-column">
            <SearchStatus number={lengthUser} />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">??????</th>
                  <th scope="col">????????????????</th>
                  <th scope="col">??????????????????</th>
                  <th scope="col">????????????????????, ??????</th>
                  <th scope="col">????????????</th>
                  <th scope="col">??????????????????</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <Users
                  users={userCrop}
                  onDelete={handleDelete}
                  onToggle={handleToggleBookmark}
                />
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <Pagination
                length={lengthUser}
                pageSize={pageSize}
                onPage={handleChangePage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {!users ? (
        <h4>
          <span className="badge m-2 h-12 bg-danger">
            ?????????? ???? ?????????????? ?? ?????????? ??????????????
          </span>
        </h4>
      ) : (
        renderTable()
      )}
    </div>
  );
};

export default App;
