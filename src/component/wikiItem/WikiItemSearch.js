import React from "react";
import {Field, withFormik} from "formik";
import * as Yup from "yup"
import {connect} from "react-redux";
import {fetchWikiItemsByQueryAction,clearWikiItemsAction} from "../../action/wikiAction";

class WikiItemSearch extends React.Component {

    renderForm = () => {
        const { handleSubmit, errors } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <br/>
                    <div className={"form-row justify-content-center"}>
                        <div className={"form-group col-md-6"}>
                            <Field id={"query"} name={"query"} className={"form-control form-rounded"} />
                            <p style={{color:"red"}}>{errors.query}</p>
                        </div>
                    </div>
                    <div className={"form-row justify-content-center"}>
                        <div className={"form-group col-md-6"}>
                            <button type={"submit"} className={"btn btn-primary btn-lg btn-block"}>Search Wikidata</button>
                        </div>
                    </div>
                </form>
            </div>
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