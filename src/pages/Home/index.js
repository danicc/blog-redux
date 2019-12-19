import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Row } from "../../components";
import {
  selectUsers,
  selectTotalUsers,
  selectUsersLoading,
  selectUsersError
} from "../../reducer/users";
import { getUsers, usersSelectOne } from "../../actions/users";

import "./styles.css";

function Home() {
  const users = useSelector(state => {
    return selectUsers(state);
  });
  const usersTotal = useSelector(selectTotalUsers);
  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <div>Loading</div>}
      {error && <div>{error.message}</div>}
      <h3>{`Users total: ${usersTotal}`}</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th className="users-table__head">Name</th>
            <th className="users-table__head">E-mail</th>
            <th className="users-table__head">Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <Row
              key={user.id}
              dataFirst={user.name}
              dataSecond={user.email}
              dataThird={user.website}
              actionLink={`/posts`}
              handleAction={() => dispatch(usersSelectOne(user))}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
