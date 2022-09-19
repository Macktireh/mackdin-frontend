import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import getCurrentUserAction from "../user/getCurrentUser.action";

const refreshToken = async (config: any, dispatch: Dispatch<AnyAction> | any, action: Function, param: any = null) => {
  try {
    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });
    const res = await Axios.post(Api.refreshTokenEndpoint, body, config);
    if (res.data.code !== "token_not_valid") {
      await localStorage.setItem("access", res.data.access);
      dispatch({ type: Types.REFRESH_TOKEN_SUCCESS });
      dispatch({ type: Types.AUTHENTICATED_SUCCESS });
      dispatch(getCurrentUserAction());
      param ? dispatch(action(param)) : dispatch(action());
    } else {
      dispatch({ type: Types.REFRESH_TOKEN_FAIL });
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.LOGIN_FAIL });
    }
  } catch (error) {
    dispatch({ type: Types.REFRESH_TOKEN_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGIN_FAIL });
  }
};

const checkAuthenticatedAction = (action: Function, param: any = null) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await Axios.post(Api.verifyTokenEndpoint, body, config);
      if (res.data.code !== "token_not_valid") {
        dispatch({ type: Types.VERIFY_TOKEN_SUCCESS });
        dispatch({ type: Types.AUTHENTICATED_SUCCESS });
        dispatch(getCurrentUserAction());
        param ? dispatch(action(param)) : dispatch(action());
      } else {
        dispatch({ type: Types.VERIFY_TOKEN_FAIL });
        refreshToken(config, dispatch, action, param);
      }
    } catch (error) {
      dispatch({ type: Types.VERIFY_TOKEN_FAIL });
      refreshToken(config, dispatch, action, param);
    }
  } else {
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGIN_FAIL });
  }
};

export default checkAuthenticatedAction;
