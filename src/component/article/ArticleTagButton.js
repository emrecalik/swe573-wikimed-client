import React from "react";
import {getCookie} from "../../action/cookie/cookieActions";
import { connect } from "react-redux";
import { postArticlesWithWikiItems } from "../../action/pubmedArticleAction";

class ArticleTagButton extends React.Component {

    tagButton = () => {
        return (
            <button type={"button"} className={"btn btn-danger col-md-12"} onClick={this.tagButtonClick}>
                Tag Article
            </button>
        )
    }

    tagButtonClick = () => {
        const { articles, wikiItems, target } = this.props;
        this.props.postArticlesWithWikiItems({
            userId: getCookie("userId"),
            articles: articles,
            wikiItems: wikiItems
        }, target)
    }

    render() {
        return (
            <div>{this.tagButton()}</div>
        )
    }
}

export default connect(null, { postArticlesWithWikiItems })(ArticleTagButton);