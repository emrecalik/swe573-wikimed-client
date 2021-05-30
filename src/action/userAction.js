import {Request} from "../api/request";
import {FETCH_ACTIVITY_STREAM, FETCH_USER_DETAILS_BY_ID, FOLLOW_USER, UNFOLLOW_USER} from "./types";
import {setError} from "./errorAction";
import {refreshTokenAction} from "./authAction";
import history from "../history";
import {getCookie} from "./cookie/cookieActions";
import {API_ACTIVITIES, API_USERS} from "./urls";

export const fetchUserDetailsByIdAction = (userId) => async (dispatch) => {
    const requesterId = getCookie("userId");
    try {
        const response = await Request().get(API_USERS + `/${userId}`, {
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

        const response = await Request().post(API_USERS + `/${userId}/follow/${followeeId}`, {
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

        const response = await Request().delete(API_USERS + `/${userId}/unFollow/${followeeId}`, {
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
        const response = await Request().get(API_ACTIVITIES + `/${userId}`, {
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