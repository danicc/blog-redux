import { usersTypes } from "../actions/users";
import { createSelector } from "reselect";

const initialState = {
  all: [],
  selected: null,
  loading: false,
  error: null
};

const {
  USERS_REQUEST,
  USERS_SUCCESS,
  USERS_ERROR,
  USERS_SELECT_ONE
} = usersTypes;

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_REQUEST:
      return { ...state, loading: true };
    case USERS_SUCCESS:
      return { ...state, loading: false, all: action.payload, error: null };
    case USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case USERS_SELECT_ONE:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
}

const selectUsers = createSelector(
  state => state.users.all,
  users => users
);

const selectUserSelected = createSelector(
  state => state.users.selected,
  selected => selected
);

const selectTotalUsers = createSelector(selectUsers, users => users.length);

function selectUsersLoading(state) {
  return state.users.loading;
}

function selectUsersError(state) {
  return state.users.error;
}

export default usersReducer;

export {
  selectUsers,
  selectUserSelected,
  selectTotalUsers,
  selectUsersLoading,
  selectUsersError
};
