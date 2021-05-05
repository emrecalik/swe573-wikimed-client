import {HIDE_SUCCESS_MODAL, SHOW_SUCCESS_MODAL} from "../action/types";

const initialState = {
    header: null,
    message: null,
    showModal: false,
    target: null
}

export const successReducer = (state = initialState, action) => {
    switch (action.type){
        case SHOW_SUCCESS_MODAL:
            const { header, message } = action.payload
            return { header: header, message: message, showModal: true, target: action.target };
        case HIDE_SUCCESS_MODAL:
            return { ...initialState };
        default:
            return state;
    }
}