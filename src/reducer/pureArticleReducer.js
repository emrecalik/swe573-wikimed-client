import {CLEAR_PURE_ARTICLES, FETCH_PURE_ARTICLE_BY_ID, FETCH_PURE_ARTICLES_BY_QUERY} from "../action/types";
import _ from "lodash";

export const pureArticleReducer = (state = { }, action) => {
    switch (action.type) {
        case FETCH_PURE_ARTICLES_BY_QUERY:
            const { totalPureArticleCount, pureArticles } = action.payload;
            return { totalPureArticleCount, pureArticles: { ..._.mapKeys(pureArticles, "id") } };
        case FETCH_PURE_ARTICLE_BY_ID:
            return { ...state, [action.payload.id]: action.payload };
        case CLEAR_PURE_ARTICLES:
            return { }
        default:
            return state
    }
}