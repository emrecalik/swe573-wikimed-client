import React from "react";
import {Button, Modal} from "react-bootstrap";
import { connect } from "react-redux";
import history from "../../history";

class SuccessModal extends React.Component {

    handleClose = (target) => {
        history.push(target);
    }

    render() {

        const { header, message, target } = this.props.success;

        return (
            <Modal show={true} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose(target)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.success
    }
}

export default connect(mapStateToProps)(SuccessModal);