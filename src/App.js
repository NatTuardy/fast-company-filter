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
  }, []);

  useEffect(() => {
    // const newArr = users.map((user) => ({ ...user, status: false }));
    // setUsers(newArr);
    api.professions.fetchAll().then((date) => setProfessions(date));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  // console.log(professions);
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
    console.log(item);
  };

  // pagination
  const pageSize = 2;
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const filterUsers = selectedProf ? users.filter((user) => user.profession === selectedProf) : users;
  const lengthUser = filterUsers.length;
  const userCrop = paginate(filterUsers, currentPage, pageSize);
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
                Очистить
              </button>
            </div>
          )}
          <div className="d-flex flex-column">
            <SearchStatus number={lengthUser} />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Имя</th>
                  <th scope="col">Качества</th>
                  <th scope="col">Профессия</th>
                  <th scope="col">Встретился, раз</th>
                  <th scope="col">Оценка</th>
                  <th scope="col">Избранное</th>
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
      {users.length === 0 ? (
        <h4>
          <span className="badge m-2 h-12 bg-danger">
            Никто не тусанет с тобой сегодня
          </span>
        </h4>
      ) : (
        renderTable()
      )}
    </div>
  );
};

export default App;
