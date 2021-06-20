import {AUTHENTICATE, CLEAR_PURE_ARTICLES, CLEAR_WIKI_ITEMS, SHOW_SUCCESS_MODAL, SIGN_IN, SIGN_OUT} from "./types";
import {Request} from "../api/request";
import history from "../history";
import {getCookie, setCookie} from "./cookie/cookieActions";
import {setError} from "./errorAction";
import {API_AUTH} from "./urls";

export const signInAction = (body) => async (dispatch) => {
    const json = JSON.stringify(body);
    try {
        const response = await Request().post(API_AUTH + "/signin", json);
        dispatch({
            type: SIGN_IN,
            payload: response.data
        });
        dispatch({ type: CLEAR_PURE_ARTICLES })
        dispatch({ type: CLEAR_WIKI_ITEMS })
        history.push("/");
    } catch (error) {
        dispatch(setError(error, "/user/signin"));
        history.push("/error");
    }
}

export const signOutAction = () => async (dispatch) => {
    const refreshToken = getCookie("refreshToken")
    const json = JSON.stringify({refreshToken: refreshToken});
    try {
        await Request().delete(API_AUTH + "/signout", {
            data: json
        });
        dispatch({ type: SIGN_OUT });
        dispatch({ type: CLEAR_PURE_ARTICLES })
        dispatch({ type: CLEAR_WIKI_ITEMS })
    } catch (error) {
        dispatch(setError(error, "/"));
        history.push("/error");
    }
}

export const signUpAction = (body) => async (dispatch) => {
    const json = JSON.stringify(body);
    try {
        const response = await Request().post(API_AUTH + "/signup", json);
        dispatch({
            type: SHOW_SUCCESS_MODAL,
            payload: response.data,
            target: "/",
        });
        history.push("/success");
    } catch(error) {
        dispatch(setError(error, "/user/signup"));
        history.push("/error");
    }
}

export const authenticateAction = () => async (dispatch) => {
    dispatch({
        type: AUTHENTICATE
    });
}

export const refreshTokenAction = () => async (dispatch) => {
    const refreshToken = getCookie("refreshToken")
    const json = JSON.stringify({refreshToken: refreshToken});
    try {
        const response = await Request().post(API_AUTH + "/token/refresh", json);
        setCookie("accessToken", response.data.refreshedAccessToken);
    } catch(error) {
        dispatch(setError(error, "/"));
        history.push("/error");
    }
}