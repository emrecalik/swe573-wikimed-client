import React from "react";
import { connect } from "react-redux";

import { fetchArticleByIdAction } from "../../action/articleAction";
import {Table} from "react-bootstrap";
import Spinner from "../common/Spinner";

class ArticleShow extends React.Component {

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
            this.props.fetchArticleByIdAction(this.props.match.params.id);
            return <Spinner/>
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
        article: state.articles[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchArticleByIdAction })(ArticleShow);