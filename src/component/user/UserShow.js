import React from "react";
import { connect } from "react-redux";

import { fetchUserDetailsByIdAction, followUserAction, unFollowUserAction } from "../../action/userAction";
import { fetchArticlesByUserIdAction } from "../../action/articleAction";
import {getCookie} from "../../action/cookie/cookieActions";
import ArticleTable from "../article/ArticleTable";
import history from "../../history";
import Spinner from "../common/Spinner";

class UserShow extends React.Component {

    userId = this.props.match.params.id;

    componentDidMount() {
        this.props.fetchUserDetailsByIdAction(this.userId);
    }

    renderFollowButton = () => {
        const isFollowedByRequester = this.props.user.followedByRequester;

        if (this.userId === getCookie("userId") ||
            isFollowedByRequester === undefined) {
            return null
        }

        if (isFollowedByRequester) {
            return (
                <button
                    type={"button"}
                    className={"btn btn-danger"}
                    onClick={() => this.props.unFollowUserAction(this.userId)}
                >
                    Unfollow User
                </button>
            )
        } else {
            return (
                <button
                    type={"button"}
                    className={"btn btn-primary"}
                    onClick={() => this.props.followUserAction(this.userId)}
                >
                    Follow User
                </button>
            )
        }
    }

    getPageNum = (pageNum) => {
        this.props.fetchArticlesByUserIdAction(this.userId, pageNum,
            () => history.push({
                pathname: `/user/show/${this.userId}`,
                search: `page=${pageNum}`
            }));
    }

    render() {
        if (this.props.user.id.toString() !== this.props.match.params.id) {
            return <Spinner/>
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
                            <div className={"card"}>
                                {this.renderFollowButton()}
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <ArticleTable
                    getPageNum={this.getPageNum}
                    location={this.props.location}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps,
    { fetchUserDetailsByIdAction, followUserAction, unFollowUserAction, fetchArticlesByUserIdAction  })(UserShow);
