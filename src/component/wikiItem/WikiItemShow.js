import React from "react";
import {Table} from "react-bootstrap";
import{ connect } from "react-redux";
import { fetchWikiItemByIdAction } from "../../action/wikiAction";

class WikiItemShow extends React.Component {

    componentWillMount() {
        this.props.fetchWikiItemByIdAction(this.props.match.params.entityId);
    }

    showAliases = (aliases) => {
        return aliases === null
            ?
            null
            :
            Object.values(aliases).map((alias) => {
                return (
                    <tr key={alias}>
                        <td>{alias}</td>
                    </tr>
                )
            })
    }

    loadWikiItemFields = () => {
        const { entityId, conceptUri, label, description, aliases } = this.props.wikiItem;
        return (
            <tr>
                <td>{entityId}</td>
                <td><a href={conceptUri} target={"_blank"} rel={"noreferrer"}>{conceptUri}</a></td>
                <td>{label}</td>
                <td>{description}</td>
                <td>{this.showAliases(aliases)}</td>
            </tr>
        )
    }

    renderWikiItem = () => {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Resource URI</th>
                        <th>Label</th>
                        <th>Description</th>
                        <th>Aliases</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.loadWikiItemFields()}
                    </tbody>
                </Table>
            </div>
        )
    }

    render() {
        if (!this.props.wikiItem) {
            return <div>Loading...</div>;
        }

        return (
            <React.Fragment>
                {this.renderWikiItem()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        wikiItem: state.wikiItems[ownProps.match.params.entityId]
    }
}

export default connect(mapStateToProps, { fetchWikiItemByIdAction })(WikiItemShow);