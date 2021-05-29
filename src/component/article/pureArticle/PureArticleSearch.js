import React from "react";
import { Field, withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup"

import {fetchPureArticlesByQuery,clearPureArticles} from "../../../action/pureArticleAction";
import {setCookie} from "../../../action/cookie/cookieActions";

class PureArticleSearch extends React.Component {

    renderForm = () => {
        const { handleSubmit, errors } = this.props;
        return (
            <React.Fragment>
                <form className={"form-inline my-2 my-lg-0 form-row justify-content-center"} onSubmit={handleSubmit}>
                    <Field
                        id={"query"}
                        name={"query"}
                        className={"form-control mr-sm-2 col-md-6"}
                        placeholder={"Search on PubMed"}
                        aria-label={"Search"}
                    />
                    <button
                        className={"btn btn-outline-primary my-2 my-sm-0"}
                        type={"submit"}
                    >
                        Search Article
                    </button>
                </form>
                <p style={{color:"red"}} className={"row col-md-9 justify-content-center"}>{errors.query}</p>
            </React.Fragment>
        )
    }

   render() {
       return (
           <React.Fragment>
               {this.renderForm()}
           </React.Fragment>
       )
    }
}

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        query: Yup.string()
            .min(3, "Minimum 3 characters")
    }),
    mapPropsToValues: () => ({
        query: "",
    }),
    handleSubmit: (payload, { props }) => {
        setCookie("query", payload.query)
        props.clearPureArticles();
        props.fetchPureArticlesByQuery(payload.query, props.pageNum);
    },
    displayName: "PureArticleSearch",
})(PureArticleSearch);

export default connect(null, { fetchPureArticlesByQuery,clearPureArticles })(formikEnhancer);