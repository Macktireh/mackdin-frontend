import { AnyAction, Dispatch } from "redux";

import * as Types from "../types";
import { loadUser } from "./loadUser.action";

export const login =
  (isAuthenticated: boolean = false) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
    if (isAuthenticated) {
      dispatch({
        type: Types.LOGIN_SUCCESS,
      });
      dispatch(loadUser());
    } else {
      dispatch({
        type: Types.LOGIN_FAIL,
      });
    }
  };
