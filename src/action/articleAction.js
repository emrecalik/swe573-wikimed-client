import {Request} from "../api/request";
import {getCookie} from "./cookie/cookieActions";
import {
    DELETE_ARTICLE, DELETE_ARTICLE_TAG,
    FETCH_ARTICLE_BY_ID,
    FETCH_MY_ARTICLES,
    FETCH_PAGINATED_ARTICLES,
    SHOW_SUCCESS_MODAL
} from "./types";
import history from "../history";
import {setError} from "./errorAction";
import {refreshTokenAction} from "./authAction";

export const fetchArticlesByUserIdAction = (userId, pageNum, postMethod) => async (dispatch) => {
    try {
        const response = await Request().get(`/api/article/mylist`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
            params: {
                userId: userId,
                pageNum: pageNum
            }
        });
        dispatch({
            type: FETCH_MY_ARTICLES,
            payload: response.data
        });
        postMethod();
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(fetchArticlesByUserIdAction(userId, pageNum, postMethod)));
        } else {
            setError(error, "/")
            history.push("/error");
        }
    }
}

export const deleteArticleAction = (articleId) => async (dispatch) => {
    try {
        const response = await Request().delete(`/api/article/${articleId}`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
        });
        dispatch({
            type: DELETE_ARTICLE,
            payload: articleId,
        });
        dispatch({
            type: SHOW_SUCCESS_MODAL,
            payload: response.data,
            target: "/article/mylist"
        })
        history.push("/success");
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(deleteArticleAction(articleId)));
        } else {
            setError(error, "/")
            history.push("/error");
        }
    }
}

export const fetchArticleByIdAction = (articleId) => async (dispatch) => {
    const userId = getCookie("userId");

    try {
        const response = await Request().get(`/api/article/${articleId}`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
            params: { userId: userId }
        });
        dispatch({
            type: FETCH_ARTICLE_BY_ID,
            payload: response.data
        });
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(fetchArticleByIdAction(articleId)));
        } else {
            setError(error, "/")
            history.push("/error");
        }
    }
}

export const fetchPaginatedArticles = (pageNum, postMethod) => async (dispatch) => {
    const userId = getCookie("userId");
    try {
        const response = await Request().get(`/api/article/all`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
            params: {
                pageNum: pageNum,
                userId: userId
            }
        });
        dispatch({
            type: FETCH_PAGINATED_ARTICLES,
            payload: response.data
        });
        postMethod();
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(fetchPaginatedArticles(pageNum, postMethod)));
        } else {
            setError(error)
            history.push("/error");
        }
    }
}

export const rateArticleAction = (articleId, rateValue, target) => async (dispatch) => {
    try {
        const response = await Request().post(`/api/article/${articleId}/rate`, null ,{
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
            params: {
                userId: getCookie("userId"),
                rateValue: rateValue
            }
        });
        dispatch({
            type: SHOW_SUCCESS_MODAL,
            payload: response.data,
            target: target,
        });
        history.push("/success");
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(rateArticleAction(articleId, rateValue, target)));
        } else {
            setError(error)
        }
    }
}

export const deleteArticleTagAction = (articleId, wikiItemEntityId) => async (dispatch) => {
    try {
        const response = await Request().delete(`/api/article/${articleId}/delete/${wikiItemEntityId}`,{
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
        });
        dispatch({
            type: DELETE_ARTICLE_TAG,
        });
        dispatch({
            type: SHOW_SUCCESS_MODAL,
            payload: response.data,
            target: `/article/edit/${articleId}`
        })
        history.push("/success");
    } catch (error) {
        if (error.response.data.message === "Expired JWT Token") {
            Promise.resolve(dispatch(refreshTokenAction()))
                .then(() => dispatch(deleteArticleTagAction(articleId, wikiItemEntityId)));
        } else {
            setError(error)
        }
    }

}