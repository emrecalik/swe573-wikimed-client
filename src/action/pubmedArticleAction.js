import {Request} from "../api/request";
import {
    CLEAR_PUBMED_ARTICLES,
    FETCH_PUBMED_ARTICLE_BY_ID,
    FETCH_PUBMED_ARTICLES_BY_QUERY,
    SHOW_SUCCESS_MODAL
} from "./types";
import history from "../history";
import {setError} from "./errorAction";
import {refreshTokenAction} from "./authAction";
import {getCookie} from "./cookie/cookieActions";

export const fetchPubmedArticlesAction = (query) => async (dispatch) => {

    try {
        const response = await Request().get("/api/entrez/article", {
            params: { query: query }
        });
        dispatch({
            type: FETCH_PUBMED_ARTICLES_BY_QUERY,
            payload: response.data
        });
    } catch (error) {
        dispatch(setError(error));
        history.push("/error");
    }
}

export const clearPubmedArticlesAction = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PUBMED_ARTICLES
    })
}

export const fetchPubmedArticleByIdAction = (id) => async (dispatch) => {
    try {
        const response = await Request().get(`/api/entrez/article/${id}`);
        dispatch({
            type: FETCH_PUBMED_ARTICLE_BY_ID,
            payload: response.data
        });
    } catch (error) {
        dispatch(setError(error, "/"));
        history.push("/error");
    }
}

export const postArticlesWithWikiItemsAction = (body, target) => async (dispatch) => {
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
                .then(() => dispatch(postArticlesWithWikiItemsAction(body)));
        } else {
            dispatch(setError(error, "/"));
            history.push("/error");
        }
    }
}