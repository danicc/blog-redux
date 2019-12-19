import { postsTypes } from "../actions/posts";
import { createSelector } from "reselect";

const initialState = {
  all: [],
  loading: false,
  error: null
};

const { POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR } = postsTypes;

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_REQUEST:
      return { ...state, loading: true };
    case POSTS_SUCCESS:
      return { ...state, loading: false, all: action.payload, error: null };
    case POSTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const selectPosts = createSelector(
  state => state.posts.all,
  posts => posts
);

function selectPostsLoading(state) {
  return state.users.loading;
}

function selectPostsError(state) {
  return state.posts.error;
}

export default postsReducer;

export { selectPosts, selectPostsLoading, selectPostsError };
