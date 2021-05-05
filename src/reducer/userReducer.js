import {FETCH_USER_DETAILS_BY_ID} from "../action/types";

export const userReducer = (state = { }, action) => {
    switch (action.type) {
        case FETCH_USER_DETAILS_BY_ID:
            return {...state, ...action.payload }
        default:
            return state
    }
}