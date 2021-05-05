import {HIDE_ERROR_MODAL, SHOW_ERROR_MODAL} from "../action/types";

const initialState = {
    error: null,
    showModal: false,
    target: null
}

export const errorReducer = (state = initialState, action) => {
    switch (action.type){
        case SHOW_ERROR_MODAL:
            return { error: action.payload, showModal: true, target: action.target };
        case HIDE_ERROR_MODAL:
            return { ...initialState };
        default:
            return state;
    }
}