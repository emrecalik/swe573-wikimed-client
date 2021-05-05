import React from "react";
import { Link } from "react-router-dom"

class SignUpButton extends React.Component {
    render() {
        return (
            <Link
                to={"/user/signup"}
                className={"btn btn-secondary my-2 my-sm-0"}
                style={{ "marginLeft":"10px"}}
            >
                Sign Up
            </Link>
        );
    }
}

export default SignUpButton;