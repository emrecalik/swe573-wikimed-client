import React from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {Pagination} from "react-bootstrap";
import { Link } from "react-router-dom";
import {clearPureArticles, fetchPureArticlesByQuery} from "../../../action/pureArticleAction";
import {getCookie} from "../../../action/cookie/cookieActions";
import PureArticleSearch from "./PureArticleSearch";

class PureArticleList extends React.Component {
    checkedItems = []
    articlesPerPage = 5

    constructor(props) {
        super(props);
        this.state = {
            currentPageNum: 1,
            checkBoxState: {}
        }
        this.handlePageNumClick = this.handlePageNumClick.bind(this)
    }

    onCheckBoxChange = (article) => {
        const { checkBoxState } = this.state
        let { id } = article;
        checkBoxState[id] = !checkBoxState[id]
        if (checkBoxState[id]) {
            this.checkedItems.push(article);
        } else {
            this.checkedItems = this.checkedItems.filter((item) => item.id !== id)
        }
        this.props.onArticleSelected(this.checkedItems);
    }

    renderArticleTitles = () => {
        if (_.isEmpty(this.props.pureArticles.pureArticles) || !this.props.pureArticles.pureArticles) {
            return null;
        }
        return Object.values(this.props.pureArticles.pureArticles).map((article) => {
            let { id } = article;

            return (
                <li className={"list-group-item my-list-item"} key={id} style={{cursor:"pointer"}}>
                    <div className={"form-check"}>
                        <input
                            className={"form-check-input"}
                            type={"checkbox"}
                            id={id}
                            checked={this.state.checkBoxState[id]}
                            onChange={() => this.onCheckBoxChange(article)}
                        />
                       <Link to={`/pureArticle/show/${id}`}>
                           {article.title}
                       </Link>
                    </div>
                </li>
            );
        })
    }

    handlePageNumClick = (e, pageNum) => {
        e.preventDefault();
        this.setState({ currentPageNum: pageNum })
        this.props.fetchPureArticlesByQuery(getCookie("query"), pageNum);
    }

    renderPageNumbers = () => {
        const PAGE_SIZE = 5;
        let pageCount = Math.ceil(this.props.pureArticles.totalPureArticleCount / PAGE_SIZE)

        if (pageCount > 10) {
            pageCount = 10;
        }

        let pageNumItems = []

        let { currentPageNum } = this.state
        let activeNum = currentPageNum !== null ? currentPageNum : 1

        for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
            let activeCss = parseInt(activeNum) === pageNum ? "active" : ""
            pageNumItems.push(
                <li className={`page-item ${activeCss}`} key={pageNum}>
                    <button
                        className={"page-link"}
                        onClick={(e) => this.handlePageNumClick(e, pageNum)}
                    >
                        {pageNum}
                    </button>
                </li>
            );
        }
        return <Pagination>{pageNumItems}</Pagination>;
    }

    render() {

        return(
            <div className={"search-list"}>
                <ul className={"list-group"}>
                    <PureArticleSearch
                        pageNum={this.state.currentPageNum}
                    />
                    {this.renderArticleTitles()}
                    {this.renderPageNumbers()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { pureArticles: state.pureArticles }
}

export default connect(mapStateToProps, { fetchPureArticlesByQuery, clearPureArticles })(PureArticleList);