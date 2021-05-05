import {Request} from "../api/request";
import {FETCH_USER_DETAILS_BY_ID} from "./types";
import {setError} from "./errorAction";
import {refreshTokenAction} from "./authAction";
import history from "../history";
import {getCookie} from "./cookie/cookieActions";

export const fetchUserDetailsById = (userId) => async (dispatch) => {
    try {
        const response = await Request().get(`/api/user/${userId}`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
        });
        dispatch({
            type: FETCH_USER_DETAILS_BY_ID,
            payload: response.data
        });
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(fetchUserDetailsById(userId)));
        } else {
            dispatch(setError(error, "/"));
            history.push("/error");
        }
    }
}