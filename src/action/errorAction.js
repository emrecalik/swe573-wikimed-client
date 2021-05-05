import {SHOW_ERROR_MODAL} from "./types";

export function setError(error, target) {
    return {
        type: SHOW_ERROR_MODAL,
        payload: error.response.data,
        target: target
    }
}