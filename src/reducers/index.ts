import { combineReducers } from "redux";

import authReducer from "@/reducers/auth.reducer";
import userReducer from "@/reducers/user.reducer";
import postReducer from "@/reducers/post.reducer";
import postLikesReducer from "@/reducers/listPostsLikes.reducer";
import postDetailsReducer from "@/reducers/postDetails.reducer";

export default combineReducers({
  authReducer,
  userReducer,
  postReducer,
  postDetailsReducer,
  postLikesReducer,
});
