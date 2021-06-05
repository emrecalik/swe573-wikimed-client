import React from "react";
import {connect} from "react-redux";

import { fetchArticleByIdAction, deleteArticleTagAction } from "../../action/articleAction";
import {Table} from "react-bootstrap";
import history from "../../history";
import WikiItemList from "../wikiItem/WikiItemList";
import ArticleTagButton from "./ArticleTagButton";
import { clearWikiItemsAction } from "../../action/wikiAction";

class ArticleEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wikiItems: null,
        }
    }

    componentDidMount() {
        this.props.clearWikiItemsAction();
        this.props.fetchArticleByIdAction(this.props.match.params.id);
    }

    handleRemoveClick = (e, entityId) => {
        e.preventDefault();
        const articleId = this.props.match.params.id
        this.props.deleteArticleTagAction(articleId, entityId)
    }

    loadTags = (tags) => {
        return Object.values(tags).map((tag) => {
            return (
                <div key={tag.entityId} className={"d-flex"} style={{marginBottom: "10px"}}>
                    <a
                        href={"/"}
                        className={"badge badge-pill badge-danger"}
                        onClick={(e) => this.handleRemoveClick(e, tag.entityId)}
                        style={{cursor:"pointer"}}
                    >
                    Remove
                    </a>
                    <a
                        href={tag.conceptUri}
                        target={"_blank"}
                        className={"badge badge-pill badge-primary"}
                        style={{"marginLeft":"10px"}}
                        rel={"noreferrer"}
                    >
                        {tag.tagName}
                    </a>
                </div>
            )
        })
    }

    loadArticleDetails = () => {
        const { id, title, tags } = this.props.article
        return (
            <tr key={id}>
                <td onClick={() => history.push(`/article/show/${id}`)} style={{cursor:"pointer"}}>{id}</td>
                <td onClick={() => history.push(`/article/show/${id}`)} style={{cursor:"pointer"}}>{title}</td>
                <td>{this.loadTags(tags)}</td>
            </tr>
         )
    }

    renderArticle = () => {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Tags</th>
                </tr>
                </thead>
                <tbody>
                    {this.loadArticleDetails()}
                </tbody>
            </Table>
        )
    }

    onWikiItemSelected = (wikiItems) => {
        this.setState({wikiItems: wikiItems})
    }

    getArticleDto = () => {
        const { entityId, articleAbstract, authors, keywords, title } = this.props.article;
        return [{
            entityId: entityId,
            articleAbstract: articleAbstract,
            authors: authors,
            keywords: keywords,
            title: title
        }]
    }

    render() {
        if (!this.props.article) {
            return <div>Loading...</div>;
        }
        return (
            <React.Fragment>
                {this.renderArticle()}
                <WikiItemList onWikiItemSelected={this.onWikiItemSelected.bind(this)}/>
                <ArticleTagButton
                    pureArticles={this.getArticleDto()}
                    wikiItems={this.state.wikiItems}
                    target={`/article/edit/${this.props.match.params.id}`}
                />
                <br/>
                <br/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        article: state.articles[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchArticleByIdAction, deleteArticleTagAction, clearWikiItemsAction })(ArticleEdit)