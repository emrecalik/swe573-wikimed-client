import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import history from "../../history";

class ErrorModal extends React.Component {

    handleClose = () => {
        history.push(this.props.error.target);
    }

    render() {
        if (!this.props.error.error) {
            return <h1>Error Page...</h1>
        }
        let { header, message } = this.props.error.error;
        if (!header) {
            header = "Error";
        }
        return (
            <Modal show={true} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return { error: state.error }
}

export default connect(mapStateToProps)(ErrorModal);