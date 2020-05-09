import React from "react";

import ActionButton from "../actionButton/actionButton.component";

//import overlay for products
import ProductOverlay from "../../overlay/overlayBody/product.overlay";

function NavBar(props) {
    return(
        <div className="navBar-wrapper">
            <div className="navBar-logo">
                <img src={require("../../Assets/logo.png")} alt="Logo" />
            </div>
            <div className="navBar-right">
            <div className="navBar-action">
                <ActionButton 
                    title="Add products"
                    size="19"
                    cb={()=>props.overlaySelector(<ProductOverlay />)}
                />
            </div>
            <div className="navBar-profile">
                Admin
            </div>
            </div>
        </div>
    );
}

export default NavBar;