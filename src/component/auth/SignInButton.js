import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signOutAction } from "../../action/authAction";

class SignInButton extends React.Component {

    handleSignOutClick = () => {
        this.props.signOutAction();
    }

    renderButton = () => {
        if (this.props.isSignedIn) {
            return (
                <Link
                    to={"/"}
                    className={`btn btn-primary active`}
                    onClick={this.handleSignOutClick}
                    style={{"marginLeft":"10px"}}
                >
                    Sign Out
                </Link>
            );
        }
        return (
            <Link
                to={"/user/signin"}
                className={"btn my-2 my-sm-0"}
                style={{marginLeft:"10px", backgroundColor: "#2282c7", color: "white"}}
            >
                Sign In
            </Link>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderButton()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signOutAction })(SignInButton);