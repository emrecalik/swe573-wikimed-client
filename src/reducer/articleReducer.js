import {
    DELETE_ARTICLE,
    DELETE_ARTICLE_TAG,
    FETCH_ARTICLE_BY_ID,
    FETCH_MY_ARTICLES,
    FETCH_PAGINATED_ARTICLES
} from "../action/types";
import _ from "lodash";

export const articleReducer = (state = { }, action) => {
    switch (action.type) {
        case FETCH_MY_ARTICLES:
        case FETCH_PAGINATED_ARTICLES:
            const { totalArticleCount, articles } = action.payload;
            return {totalArticleCount: totalArticleCount, articles: { ..._.mapKeys(articles, "id") }};
        case FETCH_ARTICLE_BY_ID:
            return { ...state, [action.payload.id]: action.payload}
        case DELETE_ARTICLE:
            return { ..._.omit(state, action.payload)}
        case DELETE_ARTICLE_TAG:
            return { ...state }
        default:
            return state
    }
}