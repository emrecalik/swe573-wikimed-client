import React from "react";
import { Field, withFormik } from "formik";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup"

import { signInAction } from "../../action/authAction";

class SignInForm extends React.Component {

    renderForm = () => {
        const { handleSubmit, errors } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={"row col-6"}>
                        <div className={"form-group row col-8"}>
                            <label htmlFor={"userName"}>Username</label>
                            <Field id={"userName"} name={"userName"} className={"form-control"} />
                            <p style={{color:"red"}}>{errors.userName}</p>
                        </div>
                    </div>
                    <div className={"row col-6"}>
                        <div className={"form-group row col-8"}>
                            <label htmlFor={"password"}>Password</label>
                            <Field id={"password"} name={"password"} className={"form-control"} />
                            <p style={{color:"red"}}>{errors.password}</p>
                        </div>
                    </div>
                    <div className={"row align-items-center col-6"}>
                        <div className={"row col-8 justify-content-between"}>
                            <button type={"submit"} className={"btn btn-primary"}>Submit</button>
                            <Link to={"/user/forgot-password"}>Forgot Password?</Link>
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
        userName: Yup.string()
            .min(2, "Minimum 2 characters")
            .max(15, "Maximum 15 characters")
            .required("Username is required."),
        password: Yup.string()
            .min(8, "Minimum 8 characters")
            .max(15, "Maximum 15 characters")
            .required("Password is required."),
    }),
    mapPropsToValues: () => ({
        userName: "",
        password: "",
    }),
    handleSubmit: (payload, { props }) => {
        props.signInAction(payload);
    },
    displayName: "SignInForm",
})(SignInForm);



export default connect(null,{ signInAction })(formikEnhancer);
