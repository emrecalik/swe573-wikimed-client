import React from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {Pagination} from "react-bootstrap";

import PubmedArticleSearch from "./PubmedArticleSearch";
import {clearPubmedArticlesAction, fetchPubmedArticlesAction} from "../../../action/pubmedArticleAction";
import history from "../../../history";

class PubmedArticleList extends React.Component {
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

    getArticlesForCurrentPage = () => {
        const indexOfLastArticle = this.state.currentPageNum * this.articlesPerPage
        const indexOfFirstArticle = indexOfLastArticle - this.articlesPerPage
        return Object.values(this.props.articles).slice(indexOfFirstArticle, indexOfLastArticle)
    }

    onCheckBoxChange = (article) => {
        const { checkBoxState } = this.state
        let { entityId } = article;
        checkBoxState[entityId] = !checkBoxState[entityId]
        if (checkBoxState[entityId]) {
            this.checkedItems.push(article);
        } else {
            this.checkedItems = this.checkedItems.filter((item) => item.entityId !== entityId)
        }
        this.props.onArticleSelected(this.checkedItems);
    }

    renderArticleTitles = () => {
        if (_.isEmpty(this.props.articles) || !this.props.articles) {
            return null;
        }

        return this.getArticlesForCurrentPage().map((article) => {
            let { entityId } = article;
            return (
                <li className={"list-group-item my-list-item"} key={entityId} style={{cursor:"pointer"}}>
                    <div className={"form-check"}>
                        <input
                            className={"form-check-input"}
                            type={"checkbox"}
                            id={entityId}
                            checked={this.state.checkBoxState[entityId]}
                            onChange={() => this.onCheckBoxChange(article)}
                        />
                       <div onClick={() => history.push(`/article/pubmed/show/${entityId}`)}>
                           {article.title}
                       </div>
                    </div>
                </li>
            );
        })
    }

    handlePageNumClick = (e, pageNum) => {
        e.preventDefault();
        this.setState({ currentPageNum: pageNum})
    }

    renderPageNumbers = () => {
        let articles = Object.values(this.props.articles);
        let pageNumItems = []

        let { currentPageNum } = this.state
        let activeNum = currentPageNum !== null ? currentPageNum : 1

        for (let pageNum = 1; pageNum <= Math.ceil(articles.length / this.articlesPerPage); pageNum++) {
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
                    <PubmedArticleSearch/>
                    {this.renderArticleTitles()}
                    {this.renderPageNumbers()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { articles: state.pubmedArticles }
}

export default connect(mapStateToProps, { fetchPubmedArticlesAction, clearPubmedArticlesAction })(PubmedArticleList);