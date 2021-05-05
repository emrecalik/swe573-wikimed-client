import React from "react";
import { connect } from "react-redux";
import { Field, withFormik } from "formik";
import * as Yup from "yup";

import { signUpAction } from "../../action/authAction";

class SignUpForm extends React.Component {

    showValidationError = (errorFieldName, touchedFieldName) => {
        return errorFieldName && touchedFieldName ? (<p style={{color:"red"}}>{errorFieldName}</p>) : null;
    }

    renderForm = () => {
        const { handleSubmit, errors, touched } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={"form-row"}>
                        <div className={"form-group col-md-4"}>
                            <label htmlFor={"firstName"}>First Name</label>
                            <Field id={"firstName"} name={"firstName"} className={"form-control"} />
                            {this.showValidationError(errors.firstName, touched.firstName)}
                        </div>
                    </div>
                    <div className={"form-row"}>
                        <div className={"form-group col-md-4"}>
                            <label htmlFor={"lastName"}>Last Name</label>
                            <Field id={"lastName"} name={"lastName"} className={"form-control"} />
                            {this.showValidationError(errors.lastName, touched.lastName)}
                        </div>
                    </div>
                    <div className={"form-row"}>
                        <div className={"form-group col-md-4"}>
                            <label htmlFor={"userName"}>Username</label>
                            <Field id={"userName"} name={"userName"} className={"form-control"} />
                            {this.showValidationError(errors.userName, touched.userName)}
                        </div>
                    </div>
                    <div className={"form-row"}>
                        <div className={"form-group col-md-4"}>
                            <label htmlFor={"email"}>Email</label>
                            <Field id={"email"} name={"email"} type={"email"} className={"form-control"}/>
                            {this.showValidationError(errors.email, touched.email)}
                        </div>
                    </div>
                    <div className={"form-row"}>
                        <div className={"form-group col-md-4"}>
                            <label htmlFor={"password"}>Password</label>
                            <Field id={"password"} name={"password"} className={"form-control"} />
                            {this.showValidationError(errors.password, touched.password)}
                        </div>
                    </div>
                    <div className={"form-row"}>
                        <div className={"form-group col-md-4"}>
                            <button type={"submit"} className={"btn btn-primary btn-lg btn-block"}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderForm()}
            </React.Fragment>
        );
    }
}

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Minimum 2 characters")
            .max(15, "Maximum 15 characters")
            .required("Firstname is required."),
        lastName: Yup.string()
            .min(2, "Minimum 2 characters")
            .max(15, "Maximum 15 characters")
            .required("Lastname is required."),
        userName: Yup.string()
            .min(2, "Minimum 2 characters")
            .max(15, "Maximum 15 characters")
            .required("Username is required."),
        email: Yup.string()
            .email("Invalid email").required("Email is required."),
        password: Yup.string()
            .min(8, "Minimum 8 characters")
            .max(15, "Maximum 15 characters")
            .required("Password is required."),
    }),
    mapPropsToValues: () => ({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    }),
    handleSubmit: (payload, { props }) => {
        props.signUpAction(payload);
    },
    displayName: "SignUpForm",
})(SignUpForm);

export default connect(null,{ signUpAction })(formikEnhancer);