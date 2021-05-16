import {FETCH_ACTIVITY_STREAM} from "../action/types";

export const activityReducer = (state = { }, action) => {
    switch (action.type) {
        case FETCH_ACTIVITY_STREAM:
            return { ...action.payload }
        default:
            return state
    }
}