import React from "react";
import WikiItemList from "./wikiItem/WikiItemList";
import ArticleTagButton from "./article/ArticleTagButton";
import PureArticleList from "./article/pureArticle/PureArticleList";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wikiItems: null,
            pureArticles: null
        }
    }

    onWikiItemSelected = (wikiItems) => {
        this.setState({wikiItems: wikiItems})
    }

    onArticleSelected = (pureArticles) => {
        this.setState({pureArticles: pureArticles})
    }

    render() {
        return (
            <React.Fragment>
                <PureArticleList onArticleSelected={this.onArticleSelected.bind(this)}/>
                <hr/>
                <WikiItemList onWikiItemSelected={this.onWikiItemSelected.bind(this)}/>
                <hr/>
                <ArticleTagButton
                    pureArticles={this.state.pureArticles}
                    wikiItems={this.state.wikiItems}
                    target={"/"}
                />
            </React.Fragment>
        )
    }
}

export default Home;