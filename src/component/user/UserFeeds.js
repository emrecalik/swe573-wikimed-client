import React from "react";
import { connect } from "react-redux";

import { fetchActivityStreamAction } from "../../action/userAction";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

class UserFeeds extends React.Component {

    componentDidMount() {
        this.props.fetchActivityStreamAction();
    }

    getObjectElement = (object) => {
        if (object === null) {
            return null;
        }
        const objectUri = "/" + object.type.toString().toLowerCase() + `/show/${object.id}`;
        return <Link to={objectUri}>{object.name}</Link>
    }

    renderFeedDetails = () => {
        return Object.values(this.props.activities).map((activity) => {
            const { summary, actor, object, timeAgo } = activity;
            return (
                <tr>
                    <td>
                        <Link to={`/user/show/${actor.id}`}>{actor.firstName} {actor.lastName}</Link>
                        {summary}
                        {this.getObjectElement(object)}
                        <div style={{fontStyle: "italic", fontSize: "12px"}}>{timeAgo}</div>
                    </td>
                </tr>

            )
        })
    }

    renderFeedList = () => {
        return (
            <div className={"overflow-auto"} style={{maxHeight: "500px"}}>
                <Table striped bordered hover className>
                    <thead>
                    <tr>
                        <th>Activity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderFeedDetails()}
                    </tbody>
                </Table>
            </div>
        )
    }

    render() {
        if (!this.props.activities) {
            return null;
        }
        return (
            <div className={"overflow-auto"}>
                {this.renderFeedList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activities: state.activities
    }
}

export default connect(mapStateToProps, { fetchActivityStreamAction })(UserFeeds);