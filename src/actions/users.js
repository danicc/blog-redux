import axios from "axios";

const USERS_REQUEST = "USERS_REQUEST";
const USERS_SUCCESS = "USERS_SUCCESS";
const USERS_ERROR = "USERS_ERROR";
const USERS_SELECT_ONE = "USERS_SELECT_ONE";

function usersRequest() {
  return { type: USERS_REQUEST };
}
function usersSuccess(payload) {
  return { type: USERS_SUCCESS, payload };
}
function usersError(payload) {
  return { type: USERS_ERROR, payload };
}
function usersSelectOne(payload) {
  return { type: USERS_SELECT_ONE, payload };
}

const usersTypes = {
  USERS_REQUEST,
  USERS_ERROR,
  USERS_SUCCESS,
  USERS_SELECT_ONE
};

function getUsers() {
  return async function thunk(dispatch) {
    dispatch(usersRequest());
    try {
      const { data } = await axios({
        url: "https://jsonplaceholder.typicode.com/users",
        method: "GET"
      });
      dispatch(usersSuccess(data));
      dispatch(usersSelectOne(data[0]));
    } catch (error) {
      dispatch(usersError("Error loading users"));
    }
  };
}

export {
  usersRequest,
  usersSuccess,
  usersError,
  getUsers,
  usersTypes,
  usersSelectOne
};
