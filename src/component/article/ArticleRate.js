import React from "react";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating"
import Box from '@material-ui/core/Box';

import { rateArticleAction } from "../../action/articleAction";

class ArticleRate extends React.Component {

    handleRateChange = (value) => {
        const { rateArticleAction, articleId } = this.props;
        let rateValue = value.target.defaultValue;
        let currentUri = window.location.pathname.substring(1)
        rateArticleAction(articleId, rateValue, currentUri);
    }

    renderRateFeature = () => {
        const { articleId, userRate } = this.props;
        return (
            <div>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                        name={`rating-feature-${articleId}`}
                        value={userRate}
                        onChange={this.handleRateChange}
                    />
                </Box>
            </div>

        )
    }

    render() {
        return (
            <div className={"btn-group"}>
                {this.renderRateFeature()}
            </div>
        )
    }
}

export default connect(null, { rateArticleAction })(ArticleRate);