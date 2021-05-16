import {FETCH_USER_DETAILS_BY_ID, FOLLOW_USER, UNFOLLOW_USER} from "../action/types";

export const userReducer = (state = { }, action) => {
    switch (action.type) {
        case FETCH_USER_DETAILS_BY_ID:
        case FOLLOW_USER:
        case UNFOLLOW_USER:
            return {...state, ...action.payload }
        default:
            return state
    }
}
