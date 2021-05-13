import React from "react";

class Footer extends React.Component {

    render() {
        return(
            <React.Fragment>
                <div className={"my-footer"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-md-6 text-left"}>
                                Made by Emre Çalık
                            </div>
                            <div className={"col-md-6 text-right"}>
                                Bogazici University &copy; 2021
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Footer;