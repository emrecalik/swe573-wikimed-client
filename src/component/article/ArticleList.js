import React from "react";
import { connect } from "react-redux";

import { fetchPaginatedArticlesAction } from "../../action/articleAction";
import history from "../../history";
import {getCookie} from "../../action/cookie/cookieActions";
import ArticleTable from "./ArticleTable";

class ArticleList extends React.Component {

    getPageNum = (pageNum) => {
        const userId = getCookie("userId")
        this.props.fetchPaginatedArticlesAction(userId, pageNum,
            () => history.push({
                pathname: "/article/all",
                search: `page=${pageNum}`
            }));
    }

    render() {
        return (
            <React.Fragment>
                <ArticleTable
                    getPageNum={this.getPageNum}
                    location={this.props.location}
                />
            </React.Fragment>
        )
    }
}

export default connect(null, { fetchPaginatedArticlesAction })(ArticleList);