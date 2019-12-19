import axios from "axios";

import { selectUsers } from "../reducer/users";
import { usersSuccess, usersSelectOne } from "./users";
import { selectPosts } from "../reducer/posts";

const POSTS_REQUEST = "POSTS_REQUEST";
const POSTS_SUCCESS = "POSTS_SUCCESS";
const POSTS_ERROR = "POSTS_ERROR";

function postsRequest() {
  return { type: POSTS_REQUEST };
}
function postsSuccess(payload) {
  return { type: POSTS_SUCCESS, payload };
}
function postsError(payload) {
  return { type: POSTS_ERROR, payload };
}

const postsTypes = {
  POSTS_REQUEST,
  POSTS_ERROR,
  POSTS_SUCCESS
};

function getPosts() {
  return async function thunk(dispatch) {
    dispatch(postsRequest());
    try {
      const { data } = await axios({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET"
      });
      dispatch(postsSuccess(data));
    } catch (error) {
      dispatch(postsError(error));
    }
  };
}

function getPostsByUser(userId) {
  return async function thunk(dispatch, getState) {
    dispatch(postsRequest());
    try {
      const users = selectUsers(getState());
      const posts = selectPosts(getState());
      const { data } = await axios({
        url: `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        method: "GET"
      });

      const updatedPosts = [...posts, data];
      let newSelectedUser;
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          newSelectedUser = {
            ...user,
            postsKey: updatedPosts.length - 1
          };
          return newSelectedUser;
        }
        return user;
      });

      dispatch(usersSuccess(updatedUsers));
      dispatch(postsSuccess(updatedPosts));
      dispatch(usersSelectOne(newSelectedUser));
    } catch (error) {
      dispatch(postsError("Error loading posts"));
    }
  };
}

export {
  postsRequest,
  postsSuccess,
  postsError,
  getPosts,
  getPostsByUser,
  postsTypes
};
