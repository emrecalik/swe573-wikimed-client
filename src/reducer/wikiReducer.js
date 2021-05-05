import {CLEAR_WIKI_ITEMS, FETCH_WIKI_ITEM_BY_ID, FETCH_WIKI_ITEMS_BY_QUERY} from "../action/types";
import _ from "lodash";


export const wikiReducer = (state = { }, action) => {
    switch (action.type) {
        case FETCH_WIKI_ITEMS_BY_QUERY:
            return { ...state, ..._.mapKeys(action.payload, "entityId")}
        case FETCH_WIKI_ITEM_BY_ID:
            return { ...state, [action.payload.entityId]: action.payload }
        case CLEAR_WIKI_ITEMS:
            return { }
        default:
            return state
    }
}