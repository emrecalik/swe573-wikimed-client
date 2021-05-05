import {CLEAR_PUBMED_ARTICLES, FETCH_PUBMED_ARTICLE_BY_ID, FETCH_PUBMED_ARTICLES_BY_QUERY} from "../action/types";
import _ from "lodash";

export const pubmedArticleReducer = (state = { }, action) => {
    switch (action.type) {
        case FETCH_PUBMED_ARTICLES_BY_QUERY:
            return { ...state, ..._.mapKeys(action.payload, "entityId")}
        case FETCH_PUBMED_ARTICLE_BY_ID:
            return { ...state, [action.payload.entityId]: action.payload }
        case CLEAR_PUBMED_ARTICLES:
            return { }
        default:
            return state
    }
}