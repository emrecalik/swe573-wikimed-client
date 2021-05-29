import React from "react";

class Spinner extends React.Component {
    render() {
        return (
            <div className={"row justify-content-center align-self-center"}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default Spinner;