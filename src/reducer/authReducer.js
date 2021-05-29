import {AUTHENTICATE, SIGN_IN, SIGN_OUT} from "../action/types";
import {setCookie, eraseCookie, getCookie} from "../action/cookie/cookieActions";

const initialState = {
    isSignedIn: false,
    userId: null,
    role: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            const { accessToken, refreshToken, userId, role } = action.payload;
            setCookie("accessToken", accessToken);
            setCookie("refreshToken", refreshToken);
            setCookie("userId", userId);
            setCookie("role", role);
            return { isSignedIn: true, userId, role};
        case SIGN_OUT:
            eraseCookie("accessToken");
            eraseCookie("refreshToken");
            eraseCookie("userId");
            eraseCookie("role");
            eraseCookie("query");
            return { ...initialState };
        case AUTHENTICATE:
            if (getCookie("accessToken")) {
                return { isSignedIn: true, userId: getCookie("userId"), role: getCookie("role")}
            }
            return initialState
        default:
            if (getCookie("accessToken")) {
                return { isSignedIn: true, userId: getCookie("userId"), role: getCookie("role") }
            }
            return state;
    }
}