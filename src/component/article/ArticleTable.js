import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import {Link} from "react-router-dom";
import ArticleRate from "./ArticleRate";
import {Pagination, Table} from "react-bootstrap";
import _ from "lodash";
import {fetchPaginatedArticlesAction} from "../../action/articleAction";

class ArticleTable extends React.Component {

    DEFAULT_PAGE_NUM = 1;

    componentDidMount() {
        this.callFetchAction(this.DEFAULT_PAGE_NUM);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { location } = this.props;
        if (!location.search && location.search !== prevProps.location.search) {
            this.callFetchAction(this.DEFAULT_PAGE_NUM);
        }
    }

    handlePageNumClick = (e, pageNum) => {
        e.preventDefault();
        this.callFetchAction(pageNum);
    }

    callFetchAction = (pageNum) => {
        this.props.getPageNum(pageNum);
    }

    loadTags = (tags) => {
        return Object.values(tags).map((tag) => {
            return (
                <div key={tag.conceptUri}>
                    <a
                        href={tag.conceptUri}
                        target={"_blank"}
                        className={"badge badge-pill badge-primary"}
                        rel={"noreferrer"}
                    >
                        {tag.tagName}
                    </a>
                </div>
            )
        })
    }

    loadArticleDetails = () => {
        return Object.values(this.props.articles.articles).map((article) => {
            const { id, title, tags, user, rate } = article
            return (
                <tr key={id}>
                    <td onClick={() => history.push(`/article/show/${id}`)} style={{cursor:"pointer"}}>{id}</td>
                    <td onClick={() => history.push(`/article/show/${id}`)} style={{cursor:"pointer"}}>{title}</td>
                    <td>{this.loadTags(tags)}</td>
                    <td>
                        <Link to={`/user/show/${user.userId}`}>
                            {user.firstName} {user.lastName}
                        </Link>
                    </td>
                    <td>
                        <ArticleRate
                            articleId={id}
                            userRate={rate}
                        />
                    </td>
                </tr>
            )
        })
    }

    renderArticleList = () => {
        return (
            <Table striped bordered hover className>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Tags</th>
                    <th>User</th>
                    <th>Rate</th>
                </tr>
                </thead>
                <tbody>
                {this.loadArticleDetails()}
                </tbody>
            </Table>
        )
    }

    renderPageNumbers = () => {
        const PAGE_SIZE = 5
        let pageCount = Math.ceil(this.props.articles.totalArticleCount / PAGE_SIZE)
        let pageNumItems = [];
        let urlQueryPageNum = new URLSearchParams(this.props.location.search).get("page");
        let activeNum = urlQueryPageNum !== null ? urlQueryPageNum : 1
        for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
            let activeCss = parseInt(activeNum) === pageNum ? "active" : ""
            pageNumItems.push(
                <li className={`page-item ${activeCss}`} key={pageNum}>
                    <a
                        href={`/article/all/page=${pageNum}`}
                        className={"page-link"}
                        onClick={(e) => this.handlePageNumClick(e, pageNum)}
                    >
                        {pageNum}
                    </a>
                </li>
            );
        }
        return <Pagination>{pageNumItems}</Pagination>;
    }

    render() {
        console.log("Article Table");
        if (_.isEmpty(this.props.articles.articles) ||
            !Object.keys(this.props.articles.articles).length) {
            return <h5>No Article</h5>
        }

        return (
            <React.Fragment>
                {this.renderArticleList()}
                {this.renderPageNumbers()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles
    }
}

export default connect(mapStateToProps, { fetchPaginatedArticlesAction })(ArticleTable);