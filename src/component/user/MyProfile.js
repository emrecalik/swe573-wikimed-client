import React from "react";
import {connect} from "react-redux";

import {fetchUserDetailsByIdAction} from "../../action/userAction";
import {getCookie} from "../../action/cookie/cookieActions";
import history from "../../history";

class MyProfile extends React.Component {

    componentDidMount() {
        this.props.fetchUserDetailsById(getCookie("userId"));
    }

    renderCard = (cardUser) => {
        const { id, firstName, lastName, userName, email} = cardUser
        return (
            <div className={"row-3"}>
                <div
                    className={"card border-dark mb-3"}
                    style={{maxWidth: "130rem", cursor: "pointer", marginRight: "10px"}}
                    onClick={() => history.push(`/user/show/${id}`)}
                >
                    <div className={"card-header"}>{userName}</div>
                    <div className={"card-body text-dark"}>
                        <h5 className={"card-title"}>{firstName} {lastName}</h5>
                        <p className={"card-text"}>{email}</p>
                    </div>
                </div>
            </div>
        )
    }

    renderFollowees = () => {
        const { followees } = this.props.user;
        if (!followees) {
            return null;
        }
        return Object.values(followees).map((followee) => {
            return this.renderCard(followee);
        })
    }

    renderFollowers = () => {
        const { followers } = this.props.user;
        if (!followers) {
            return null;
        }
        return Object.values(followers).map((follower) => {
            return this.renderCard(follower);
        })
    }

    render() {
        if (!this.props.user) {
            return <h5>Loading...</h5>
        }

        const { firstName, lastName, userName, email } = this.props.user;

        return (
            <React.Fragment>
                <div className={"row justify-content-center align-self-center"}>
                    <div className={"card border-dark mb-3"} style={{maxWidth: "18rem"}}>
                        <div className={"card-header"}>{userName}</div>
                        <div className={"card-body text-dark"}>
                            <h5 className={"card-title"}>{firstName} {lastName}</h5>
                            <p className={"card-text"}>{email}</p>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className={"container"}>
                    <div className={"row justify-content-md-center"}>
                        <div className={"col col-lg-2"}>
                            <h2>Followees</h2>
                        </div>
                    </div>
                    <div className={"row justify-content-md-center"}>
                        <div className={"col-md-auto"}>
                            <div className={"container-fluid"}>
                                <div className={"row flex-row flex-nowrap overflow-auto"}>
                                    {this.renderFollowees()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className={"container"}>
                    <div className={"row justify-content-md-center"}>
                        <div className={"col col-lg-2"}>
                            <h2>Followers</h2>
                        </div>
                    </div>
                    <div className={"row justify-content-md-center"}>
                        <div className={"col-md-auto"}>
                            <div className={"container-fluid"}>
                                <div className={"row flex-row flex-nowrap overflow-auto"}>
                                    {this.renderFollowers()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUserDetailsById: fetchUserDetailsByIdAction })(MyProfile);