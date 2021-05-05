import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

import { fetchArticlesByUserIdAction } from "../../action/articleAction";
import {Pagination, Table} from "react-bootstrap";
import history from "../../history";
import {getCookie} from "../../action/cookie/cookieActions";

class ArticleMyList extends React.Component {

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
        const userId = getCookie("userId");
        this.props.fetchArticlesByUserIdAction(userId, pageNum,
            () => history.push({
                pathname: "/article/mylist",
                search: `page=${pageNum}`
            }));
    }

    renderDeleteEditButtons = (id) => {
        return (
            <div className={"btn-group"}>
                <Link to={`/article/edit/${id}`}>
                    <button className={"btn btn-primary my-2 my-sm-0"} style={{"marginLeft":"10px"}}>
                        Edit
                    </button>
                </Link>
                <Link to={`/article/delete/${id}`}>
                    <button className={"btn btn-secondary my-2 my-sm-0"} style={{"marginLeft":"10px"}}>
                        Delete
                    </button>
                </Link>
            </div>
        );
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
            const { id, title, tags } = article
            return (
                <tr key={id}>
                    <td onClick={() => history.push(`/article/show/${id}`)} style={{cursor:"pointer"}}>{id}</td>
                    <td onClick={() => history.push(`/article/show/${id}`)} style={{cursor:"pointer"}}>{title}</td>
                    <td>{this.loadTags(tags)}</td>
                    <td style={{"whiteSpace": "nowrap"}}>{this.renderDeleteEditButtons(id)}</td>
                </tr>
            )
        })
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
                        href={`/articles?page=${pageNum}`}
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

    renderArticleList = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Tags</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.loadArticleDetails()}
                </tbody>
            </Table>
        )
    }

    render() {
        if (_.isEmpty(this.props.articles.articles) || !Object.keys(this.props.articles.articles).length) {
            return <h5>No Article</h5>
        }

        return (
            <div className={"bg-light"}>
                {this.renderArticleList()}
                {this.renderPageNumbers()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { fetchArticlesByUserIdAction })(ArticleMyList);