import React from "react";
import { Link } from "react-router-dom";

import SignInButton from "./auth/SignInButton";
import SignUpButton from "./auth/SignUpButton";

class Header extends React.Component {

    render() {
        return (
            <div>
                <nav className={"navbar navbar-dark bg-dark"}>
                    <Link to={"/"} className={"navbar-brand"}>Home</Link>
                    <Link to={"/user/myprofile"} className={"navbar-brand"}>My Profile</Link>
                    <Link to={"/article/mylist"} className={"navbar-brand"}>My Tags</Link>
                    <Link to={"/article/all"} className={"navbar-brand"}>Tagged Articles</Link>
                    <Link to={"/user/feeds"} className={"navbar-brand"}>Feeds</Link>
                    <ul className={"nav nav-bar ml-auto"}>
                        <SignInButton/>
                        <SignUpButton/>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;