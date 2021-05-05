import React from "react";
import {Button, Modal} from "react-bootstrap";

class WarningModal extends React.Component {

    handleOk = () => {
        this.props.okMethod();
    }

    render() {
        const { title, message } = this.props;
        return(
            <Modal show={true}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleOk}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default WarningModal;