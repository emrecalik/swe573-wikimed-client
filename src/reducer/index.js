import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {errorReducer} from "./errorReducer";
import {pubmedArticleReducer} from "./pubmedArticleReducer";
import {wikiReducer} from "./wikiReducer";
import {successReducer} from "./successReducer";
import {articleReducer} from "./articleReducer";
import {userReducer} from "./userReducer";
import {activityReducer} from "./activityReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    success: successReducer,
    pubmedArticles: pubmedArticleReducer,
    wikiItems: wikiReducer,
    articles: articleReducer,
    user: userReducer,
    activities: activityReducer
});