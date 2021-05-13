import React from "react";
import {Field, withFormik} from "formik";
import * as Yup from "yup"
import {connect} from "react-redux";
import {fetchWikiItemsByQueryAction,clearWikiItemsAction} from "../../action/wikiAction";

class WikiItemSearch extends React.Component {

    renderForm = () => {
        const { handleSubmit, errors } = this.props;

        return (
            <React.Fragment>
                <hr/>
                <form className={"form-inline my-2 my-lg-0 form-row justify-content-center"} onSubmit={handleSubmit}>
                    <Field
                        id={"query"}
                        name={"query"}
                        className={"form-control mr-sm-2 col-md-6"}
                        placeholder={"Search on Wikidata"}
                        aria-label={"Search"}
                    />
                    <button
                        className={"btn btn-outline-primary my-2 my-sm-0"}
                        type={"submit"}
                    >
                        Search Wikidata
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
        props.cleanWikiItemsAction();
        props.fetchWikiItemsByQueryAction(payload.query);
    },
    displayName: "WikidataSearch",
})(WikiItemSearch);

export default connect(null, { fetchWikiItemsByQueryAction, cleanWikiItemsAction: clearWikiItemsAction })(formikEnhancer);