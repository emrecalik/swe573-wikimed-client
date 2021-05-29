import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import { connect } from "react-redux";

import history from "../history";
import Header from "./common/Header";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import Home from "./Home";
import WikiItemShow from "./wikiItem/WikiItemShow";
import ArticleMyList from "./article/ArticleMyList";
import ArticleDelete from "./article/ArticleDelete";
import ArticleShow from "./article/ArticleShow";
import ErrorModal from "./common/ErrorModal";
import SuccessModal from "./common/SuccessModal";
import PrivateRoute from "./common/PrivateRoute";
import { authenticateAction } from "../action/authAction";
import MyProfile from "./user/MyProfile";
import ArticleList from "./article/ArticleList";
import UserDetails from "./user/UserShow";
import ArticleEdit from "./article/ArticleEdit";
import UserFeeds from "./user/UserFeeds";
import Footer from "./common/Footer";
import PureArticleShow from "./article/pureArticle/PureArticleShow";

class App extends React.Component {

    componentDidMount() {
        this.props.authenticateAction();
    }

    render() {
        const { auth } = this.props;

        return (
            <React.Fragment>
                <Router history={history}>
                    <Header/>
                    <div className={"container main-content"}>
                        <Switch>
                            <Route path={["/", "/home"]} exact component={Home}/>
                            <Route path={"/user/signin"} exact component={SignInForm}/>
                            <Route path={"/user/signup"} exact component={SignUpForm}/>

                            <Route path={"/pureArticle/show/:id"} exact component={PureArticleShow}/>
                            <Route path={"/wikiItem/show/:entityId"} exact component={WikiItemShow}/>

                            <PrivateRoute
                                path={"/article/mylist"}
                                exact
                                auth={auth}
                                permissionList={["ADMIN", "USER"]}
                                component={ArticleMyList}
                            />
                            <PrivateRoute
                                path={"/article/show/:id"}
                                exact
                                auth={auth}
                                permissionList={["ADMIN", "USER"]}
                                component={ArticleShow}
                            />
                            <PrivateRoute
                                path={"/article/delete/:id"}
                                exact
                                auth={auth}
                                permissionList={["ADMIN", "USER"]}
                                component={ArticleDelete}
                            />
                            <PrivateRoute
                                path={"/article/edit/:id"}
                                exact
                                auth={auth}
                                permissionList={["ADMIN", "USER"]}
                                component={ArticleEdit}
                            />
                            <PrivateRoute
                                path={"/user/myprofile"}
                                exact
                                auth={auth}
                                permissionList={["ADMIN", "USER"]}
                                component={MyProfile}
                            />
                            <PrivateRoute
                                path={"/user/feeds"}
                                exact
                                auth={auth}
                                permissionList={["ADMIN", "USER"]}
                                component={UserFeeds}
                            />
                            <PrivateRoute
                                path={"/article/all"}
                                exact
                                auth={auth}
                                permissionList={["ADMIN", "USER"]}
                                component={ArticleList}
                            />
                            <PrivateRoute
                                path={"/user/show/:id"}
                                exact
                                auth={auth}
                                permissionList={["ADMIN", "USER"]}
                                component={UserDetails}
                            />

                            <Route path={"/error"} exact component={ErrorModal}/>
                            <Route path={"/success"} exact component={SuccessModal}/>
                        </Switch>
                    </div>
                    <Footer/>
                </Router>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { authenticateAction })(App);