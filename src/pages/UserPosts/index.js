import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";
import { UserList } from "../../components";
import {
  selectUsers,
  selectUserSelected,
  selectUsersLoading,
  selectUsersError
} from "../../reducer/users";
import { getUsers, usersSelectOne } from "../../actions/users";
import {
  selectPosts,
  selectPostsLoading,
  selectPostsError
} from "../../reducer/posts";
import { getPostsByUser } from "../../actions/posts";

function UserPosts(props) {
  const users = useSelector(selectUsers);
  const selectedUser = useSelector(selectUserSelected);
  const usersError = useSelector(selectUsersError);
  const usersLoading = useSelector(selectUsersLoading);
  const posts = useSelector(selectPosts);
  const postsLoading = useSelector(selectPostsLoading);
  const postsError = useSelector(selectPostsError);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, [users, dispatch]);

  React.useEffect(() => {
    if (selectedUser && !("postsKey" in selectedUser)) {
      dispatch(getPostsByUser(selectedUser.id));
    }
  }, [dispatch, selectedUser]);

  const handleUserSelection = React.useCallback(
    user => {
      dispatch(usersSelectOne(user));
    },
    [dispatch]
  );

  function renderUserName() {
    if (usersError) {
      return <div>{usersError}</div>;
    }

    if (!users.length || usersLoading || !selectedUser) {
      return <div>Loading</div>;
    }
    return (
      <UserList
        users={users}
        activeUserId={selectedUser.id}
        handleUserSelection={handleUserSelection}
      />
    );
  }

  function renderPosts() {
    if (usersError || usersLoading || !users.length) {
      return;
    }
    if (postsError) {
      return <div>{postsError}</div>;
    }

    if (postsLoading || !posts.length || !("postsKey" in selectedUser)) {
      return <div>Loading...</div>;
    }

    const postsKey = selectedUser.postsKey;
    if (!posts[postsKey]) {
      return <div>Loading</div>;
    }
    return posts[postsKey].map(post => {
      const { id, title, body } = post;
      return (
        <div key={id}>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      );
    });
  }
  return (
    <div className="user-posts">
      <div className="user-posts__left">{renderUserName()}</div>
      <div className="user-posts__content">{renderPosts()}</div>
    </div>
  );
}

export default UserPosts;
