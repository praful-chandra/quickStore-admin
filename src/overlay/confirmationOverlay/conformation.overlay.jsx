import React from 'react'
import {connect} from "react-redux";

import {resetDialoug} from "../../redux/actions/conformation.action";



 function Confirmation(props) {
   
    return (
        <div className="confirmationDialoug-wrapper">
            {props.content}
        </div>
    )
}

const mapStateToProps = state =>({
    content  : state.confirmation.content
})

export default connect(mapStateToProps,{resetDialoug})(Confirmation);
