import React from "react";
import {Table} from "react-bootstrap";
import {connect} from "react-redux";

import {fetchPureArticleById} from "../../../action/pureArticleAction";

class PureArticleShow extends React.Component {

    loadPureArticleKeywords = () => {
        const { keywords } = this.props.pureArticle;

        return keywords === null
            ?
            null
            :
            Object.values(keywords).map((keyword) => {
                return (
                    <tr key={keyword}>
                        <td>{keyword}</td>
                    </tr>
                )
            })
    }

    loadPureArticleAuthors = () => {
        const { authors } = this.props.pureArticle;

        return authors === null
            ?
            null
            :
            Object.values(authors).map((author) => {
                return (
                    <tr key={author.lastName}>
                        <td>{author.foreName} {author.lastName}</td>
                    </tr>
                )
            })
    }

    loadPureArticleIdTitleAbstract = () => {
        const { entityId, title, articleAbstract } = this.props.pureArticle;
        return (
            <tr>
                <td>{entityId}</td>
                <td>{title}</td>
                <td>{articleAbstract}</td>
            </tr>
        )
    }

    renderPureArticle = () => {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Abstract</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.loadPureArticleIdTitleAbstract()}
                    </tbody>
                </Table>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-sm"}>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Authors</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.loadPureArticleAuthors()}
                                </tbody>
                            </Table>
                        </div>
                        <div className={"col-sm"}>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Keywords</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.loadPureArticleKeywords()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (!this.props.pureArticle) {
            this.props.fetchPureArticleById(this.props.match.params.id);
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }

        return (
            <React.Fragment>
                {this.renderPureArticle()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        pureArticle: state.pureArticles[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchPureArticleById })(PureArticleShow);