import React from "react";
import {connect} from "react-redux";
import WikiItemSearch from "./WikiItemSearch";
import _ from "lodash";
import history from "../../history";
import {Pagination} from "react-bootstrap";

class WikiItemList extends React.Component {
    checkedItems = []
    wikiItemsPerPage = 5

    constructor(props) {
        super(props);
        this.state = {
            currentPageNum: 1,
            checkBoxState: {}
        }
        this.handlePageNumClick = this.handlePageNumClick.bind(this)
    }

    getWikiItemsForCurrentPage = () => {
        const indexOfLastWikiItem = this.state.currentPageNum * this.wikiItemsPerPage
        const indexOfFirstWikiItem = indexOfLastWikiItem - this.wikiItemsPerPage
        return Object.values(this.props.wikiItems).slice(indexOfFirstWikiItem, indexOfLastWikiItem)
    }

    onCheckBoxChange = (wikiItem) => {
        const { checkBoxState } = this.state;
        checkBoxState[wikiItem.entityId] = !checkBoxState[wikiItem.entityId]
        if (checkBoxState[wikiItem.entityId]) {
            this.checkedItems.push(wikiItem);
        } else {
            this.checkedItems = this.checkedItems.filter((item) => item.entityId !== wikiItem.entityId)
        }
        this.props.onWikiItemSelected(this.checkedItems);
    }

    renderWikiItems = () => {
        if (_.isEmpty(this.props.wikiItems) || !this.props.wikiItems) {
            return null;
        }

        return this.getWikiItemsForCurrentPage().map((wikiItem) => {
            const wikiItemId = wikiItem.entityId;
            return (
                <li className={"list-group-item my-list-item"} key={wikiItemId} style={{cursor:"pointer"}}>
                    <div className={"form-check"}>
                        <input
                            className={"form-check-input"}
                            type={"checkbox"}
                            id={wikiItemId}
                            checked={this.state.checkBoxState[wikiItemId]}
                            onChange={() => this.onCheckBoxChange(wikiItem)}
                        />
                        <div onClick={() => history.push(`/wikiItem/show/${wikiItem.entityId}`)}>
                            <h5>{wikiItem.label}</h5>
                            <div style={{fontStyle:"italic", fontSize:"12px"}}>
                                {wikiItem.description}
                            </div>
                        </div>
                    </div>
                </li>
            );
        })
    }

    handlePageNumClick = (e, pageNum) => {
        e.preventDefault();
        this.setState({ currentPageNum: pageNum})
    }

    renderPageNumbers = () => {
        let wikiItems = Object.values(this.props.wikiItems);
        let pageNumItems = []

        let { currentPageNum } = this.state
        let activeNum = currentPageNum !== null ? currentPageNum : 1

        for (let pageNum = 1; pageNum <= Math.ceil(wikiItems.length / this.wikiItemsPerPage); pageNum++) {
            let activeCss = parseInt(activeNum) === pageNum ? "active" : ""
            pageNumItems.push(
                <li className={`page-item ${activeCss}`} key={pageNum}>
                    <button
                        className={"page-link"}
                        onClick={(e) => this.handlePageNumClick(e, pageNum)}
                    >
                        {pageNum}
                    </button>
                </li>
            );
        }
        return <Pagination>{pageNumItems}</Pagination>;
    }

    render() {
        return (
            <div className={"search-list wiki-list"}>
                <ul className={"list-group"}>
                    <WikiItemSearch handleOnQuery={this.handleQuery}/>
                    {this.renderWikiItems()}
                    {this.renderPageNumbers()}
                </ul>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { wikiItems: state.wikiItems }
}

export default connect(mapStateToProps)(WikiItemList);