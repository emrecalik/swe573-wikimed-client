import {Request} from "../api/request";
import {CLEAR_WIKI_ITEMS, FETCH_WIKI_ITEM_BY_ID, FETCH_WIKI_ITEMS_BY_QUERY} from "./types";
import {setError} from "./errorAction";
import history from "../history";

export const fetchWikiItemsByQueryAction = (query) => async (dispatch) => {
    try {
        const response = await Request().get("/api/wiki", {
            params: { query: query }
        });

        dispatch({
            type: FETCH_WIKI_ITEMS_BY_QUERY,
            payload: response.data
        });

    } catch (error) {
        dispatch(setError(error, "/"));
        history.push("/error");
    }
}

export const clearWikiItemsAction = () => async (dispatch) => {
    dispatch({
        type: CLEAR_WIKI_ITEMS
    })
}

export const fetchWikiItemByIdAction = (id) => async (dispatch) => {
    try {
        const response = await Request().get(`/api/wiki/${id}`);
        dispatch({
            type: FETCH_WIKI_ITEM_BY_ID,
            payload: response.data
        });
    } catch (error) {
        dispatch(setError(error, "/"));
        history.push("/error");
    }
}