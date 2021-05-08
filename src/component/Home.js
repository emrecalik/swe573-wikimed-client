import React from "react";
import {connect} from "react-redux";

import ArticleList from "./article/pubmed/PubmedArticleList";
import WikiItemList from "./wikiItem/WikiItemList";
import { postArticlesWithWikiItems } from "../action/pubmedArticleAction";
import ArticleTagButton from "./article/ArticleTagButton";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wikiItems: null,
            articles: null
        }
    }

    onWikiItemSelected = (wikiItems) => {
        this.setState({wikiItems: wikiItems})
    }

    onArticleSelected = (articles) => {
        this.setState({articles: articles})
    }

    render() {
        return (
            <div>
                <ArticleList onArticleSelected={this.onArticleSelected.bind(this)}/>
                <WikiItemList onWikiItemSelected={this.onWikiItemSelected.bind(this)}/>
                <ArticleTagButton
                    articles={this.state.articles}
                    wikiItems={this.state.wikiItems}
                    target={"/"}
                />
                <br/>
                <br/>
            </div>
        )
    }
}

export default connect(null, { postArticlesWithWikiItems })(Home);