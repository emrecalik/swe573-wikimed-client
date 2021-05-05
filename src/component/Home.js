import React from "react";
import {connect} from "react-redux";

import ArticleList from "./article/pubmed/PubmedArticleList";
import WikiItemList from "./wikiItem/WikiItemList";
import { postArticlesWithWikiItems } from "../action/pubmedArticleAction";
import {getCookie} from "../action/cookie/cookieActions";

class Home extends React.Component {
    wikiItems = null;
    articles = null

    tagButton = () => {
        return (
            <button type={"button"} className={"btn btn-danger col-md-12"} onClick={this.tagButtonClick}>
                Tag Article
            </button>
        )
    }

    tagButtonClick = () => {
        this.props.postArticlesWithWikiItems({
            userId: getCookie("userId"),
            articles: this.articles,
            wikiItems: this.wikiItems
        })
    }

    onWikiItemSelected = (wikiItems) => {
        this.wikiItems = wikiItems
    }

    onArticleSelected = (articles) => {
        this.articles = articles;
    }

    render() {
        return (
            <div>
                <ArticleList onArticleSelected={this.onArticleSelected.bind(this)}/>
                <WikiItemList onWikiItemSelected={this.onWikiItemSelected.bind(this)}/>
                {this.tagButton()}
                <br/>
                <br/>
            </div>
        )
    }
}

export default connect(null, { postArticlesWithWikiItems })(Home);