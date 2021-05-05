import React from "react";
import {Route} from "react-router-dom";

import history from "../../history";
import WarningModal from "./WarningModal";

const generateNewUrl = (auth) => {
    return auth.isSignedIn ? "/" : "/user/signin";
}

const PrivateRoute = ({ component: Component, auth, permissionList, ...rest }) => (
    <Route
        {...rest}
        render={ (props) =>
            permissionList.includes(auth.role)
                ?
                <Component {...props}/>
                :
                <WarningModal
                    title={"Unauthorized"}
                    message={"You are not authorized for this content!"}
                    okMethod={() => history.push(generateNewUrl(auth))}
                />
        }
    />
);

export default PrivateRoute;