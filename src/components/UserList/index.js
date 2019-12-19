import React from "react";

import "./styles.css";

function UserList({ users, activeUserId, handleUserSelection }) {
  return (
    <ul className="user-list">
      {users.map(user => (
        <li
          className={
            activeUserId === user.id
              ? "user-list__item--active user-list__item"
              : "user-list__item"
          }
          key={user.id}
          onClick={() => handleUserSelection(user)}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
