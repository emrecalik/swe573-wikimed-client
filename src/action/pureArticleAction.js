import {Request} from "../api/request";
import {
    CLEAR_PURE_ARTICLES, FETCH_PURE_ARTICLE_BY_ID,
    FETCH_PURE_ARTICLES_BY_QUERY,
    SHOW_SUCCESS_MODAL
} from "./types";
import history from "../history";
import {setError} from "./errorAction";
import {refreshTokenAction} from "./authAction";
import {getCookie} from "./cookie/cookieActions";

export const fetchPureArticlesByQuery = (query, pageNum) => async (dispatch) => {

    try {
        const response = await Request().get("/api/pureArticles", {
            params: {
                query: query,
                pageNum: pageNum
            }
        });
        dispatch({
            type: FETCH_PURE_ARTICLES_BY_QUERY,
            payload: response.data
        });
    } catch (error) {
        dispatch(setError(error, "/"));
        history.push("/error");
    }
}

export const fetchPureArticleById = (id) => async (dispatch) => {
    try {
        const response = await Request().get(`/api/pureArticles/${id}`);
        dispatch({
            type: FETCH_PURE_ARTICLE_BY_ID,
            payload: response.data
        });
    } catch (error) {
        dispatch(setError(error));
        history.push("/error");
    }
}

export const clearPureArticles = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PURE_ARTICLES
    })
}

export const tagPureArticlesWithWikiItems = (body, target) => async (dispatch) => {
    const json = JSON.stringify(body);
    try {
        const response = await Request().post("/api/article", json, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`}
        });
        dispatch({
            type: SHOW_SUCCESS_MODAL,
            payload: response.data,
            target: target,
        });
        history.push("/success")
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(tagPureArticlesWithWikiItems(body)));
        } else {
            dispatch(setError(error, "/"));
            history.push("/error");
        }
    }
}