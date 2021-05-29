import React from "react";
import {getCookie} from "../../action/cookie/cookieActions";
import { connect } from "react-redux";
import { tagPureArticlesWithWikiItems } from "../../action/pureArticleAction";

class ArticleTagButton extends React.Component {

    tagButton = () => {
        return (
            <button
                type={"button"}
                className={"btn btn-primary col-md-6"}
                onClick={this.tagButtonClick}
            >
                Tag Article
            </button>
        )
    }

    tagButtonClick = () => {
        const { pureArticles, wikiItems, target } = this.props;
        this.props.tagPureArticlesWithWikiItems({
            userId: getCookie("userId"),
            pureArticles: pureArticles,
            wikiItems: wikiItems
        }, target)
    }

    render() {
        return (
            <div className={"d-flex justify-content-center"}>
                {this.tagButton()}
            </div>
        )
    }
}

export default connect(null, { tagPureArticlesWithWikiItems })(ArticleTagButton);