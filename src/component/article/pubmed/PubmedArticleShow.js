import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { fetchPubmedArticleByIdAction } from "../../../action/pubmedArticleAction";

class PubmedArticleShow extends React.Component {

    loadArticleKeywords = () => {
        const { keywords } = this.props.article;

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

    loadArticleAuthors = () => {
        const { authors } = this.props.article;

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

    loadArticleIdTitleAbstract = () => {
        const { entityId, title, articleAbstract } = this.props.article;
        return (
            <tr>
                <td>{entityId}</td>
                <td>{title}</td>
                <td>{articleAbstract}</td>
            </tr>
        )
    }

    renderArticle = () => {
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
                        {this.loadArticleIdTitleAbstract()}
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
                                    {this.loadArticleAuthors()}
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
                                    {this.loadArticleKeywords()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (!this.props.article) {
            this.props.fetchPubmedArticleByIdAction(this.props.match.params.entityId);
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }

        return (
            <React.Fragment>
                {this.renderArticle()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        article: state.pubmedArticles[ownProps.match.params.entityId]
    }
}

export default connect(mapStateToProps, { fetchPubmedArticleByIdAction })(PubmedArticleShow);