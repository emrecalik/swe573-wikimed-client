import {Request} from "../api/request";
import {FETCH_ACTIVITY_STREAM, FETCH_USER_DETAILS_BY_ID, FOLLOW_USER, UNFOLLOW_USER} from "./types";
import {setError} from "./errorAction";
import {refreshTokenAction} from "./authAction";
import history from "../history";
import {getCookie} from "./cookie/cookieActions";

export const fetchUserDetailsByIdAction = (userId) => async (dispatch) => {
    const requesterId = getCookie("userId");
    try {
        const response = await Request().get(`/api/user/${userId}`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
            params: { requesterId: requesterId }
        });
        dispatch({
            type: FETCH_USER_DETAILS_BY_ID,
            payload: response.data
        });
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(fetchUserDetailsByIdAction(userId)));
        } else {
            dispatch(setError(error, "/"));
            history.push("/error");
        }
    }
}

export const followUserAction = (followeeId) => async (dispatch) => {
    const userId = getCookie("userId");
    try {

        const response = await Request().post(`/api/user/${userId}/follow/${followeeId}`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
        });
        dispatch({
            type: FOLLOW_USER,
            payload: response.data
        });

    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(followUserAction(userId, followeeId)));
        } else {
            dispatch(setError(error, "/"));
            history.push("/error");
        }
    }
}

export const unFollowUserAction = (followeeId) => async (dispatch) => {
    const userId = getCookie("userId");
    try {

        const response = await Request().delete(`/api/user/${userId}/unFollow/${followeeId}`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
        });
        dispatch({
            type: UNFOLLOW_USER,
            payload: response.data
        });

    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(followUserAction(userId, followeeId)));
        } else {
            dispatch(setError(error, "/"));
            history.push("/error");
        }
    }
}

export const fetchActivityStreamAction = () => async (dispatch) => {
    const userId = getCookie("userId");
    try {
        const response = await Request().get(`/api/activity/${userId}`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`}
        });
        dispatch({
            type: FETCH_ACTIVITY_STREAM,
            payload: response.data
        });
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(fetchActivityStreamAction()));
        } else {
            dispatch(setError(error, "/"));
            history.push("/error");
        }
    }
}