import React from "react";
import {Table} from "react-bootstrap";
import { connect } from "react-redux";

import { fetchUserDetailsById } from "../../action/userAction";

class UserDetails extends React.Component {

    componentDidMount() {
        this.props.fetchUserDetailsById(this.props.match.params.id);
    }

    renderUserDetails = () => {
        const { id, firstName, lastName, userName, email } = this.props.user;

        return (
            <React.Fragment>
                <h2>User Info</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{id}</th>
                            <th>{firstName}</th>
                            <th>{lastName}</th>
                            <th>{userName}</th>
                            <th>{email}</th>
                        </tr>
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }

    render() {
        if (!this.props.user) {
            return <h5>Loading...</h5>
        }
        return (
            <React.Fragment>
                {this.renderUserDetails()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUserDetailsById })(UserDetails);
