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
import {API_ARTICLES} from "./urls";

export const fetchArticlesByUserIdAction = (userId, pageNum, postMethod) => async (dispatch) => {


    try {
        const response = await Request().get(API_ARTICLES + "/mylist", {
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
    const userId = getCookie("userId");

    try {
        const response = await Request().delete(API_ARTICLES + `/${articleId}`, {
            headers: { Authorization: `Bearer ${getCookie("accessToken")}`},
            params: { userId: userId }
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

export const fetchArticleByIdAction = (id) => async (dispatch) => {
    try {
        const response = await Request().get(API_ARTICLES + `/${id}`, {
            params: { userId: getCookie("userId") }
        });
        dispatch({
            type: FETCH_ARTICLE_BY_ID,
            payload: response.data
        });
    } catch (error) {
        dispatch(setError(error, "/"));
        history.push("/error");
    }
}

export const fetchPaginatedArticlesAction = (userId, pageNum, postMethod) => async (dispatch) => {
    try {
        const response = await Request().get(API_ARTICLES + "/all", {
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
                .then(() => dispatch(fetchPaginatedArticlesAction(pageNum, postMethod)));
        } else {
            setError(error)
            history.push("/error");
        }
    }
}

export const rateArticleAction = (articleId, rateValue, target) => async (dispatch) => {
    try {
        const response = await Request().post(API_ARTICLES + `/${articleId}/rate`, null ,{
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
        const response = await Request().delete(API_ARTICLES + `/${articleId}/delete/${wikiItemEntityId}`,{
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