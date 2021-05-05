import React from "react";
import {Button, Modal} from "react-bootstrap";

class OptionalModal extends React.Component {

    handleAgree = () => {
        this.props.agreeMethod();
    }

    handleDisagree = () => {
        this.props.disagreeMethod();
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
                    <Button variant="secondary" onClick={this.handleAgree}>
                        AGREE
                    </Button>
                    <Button variant="secondary" onClick={this.handleDisagree}>
                        DISAGREE
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default OptionalModal;