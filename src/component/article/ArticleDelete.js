import React from "react";
import { connect } from "react-redux";

import history from "../../history";
import { deleteArticleAction } from "../../action/articleAction";
import OptionalModal from "../common/OptionalModal";

class ArticleDelete extends React.Component {

    render() {
        return (
            <React.Fragment>
                <OptionalModal
                    title={"Article Delete"}
                    message={"Are you sure you want to delete the article?"}
                    agreeMethod={() => this.props.deleteArticleAction(this.props.match.params.id)}
                    disagreeMethod={history.goBack}
                />
            </React.Fragment>
        )
    }
}

export default connect(null, { deleteArticleAction })(ArticleDelete);