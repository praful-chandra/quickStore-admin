import React from 'react'
import {connect} from "react-redux";

import {resetDialoug} from "../../redux/actions/conformation.action";

 function conformationBody(props) {
    const response = res=>{
        
      if(res)  props.cb(res);
        props.resetDialoug();
    
    }
    return (

            <div className="confirmationDialoug-body">
                <div className="confirmationDialoug-body-message">
                   {props.message}
                </div>
                <div className="confirmationDialoug-body-action">
                    <span className="confirmationDialoug-body-action-true" onClick={()=>response(true)}>Yes</span>
                     <span className="confirmationDialoug-body-action-false" onClick={()=>response(false)}>No</span>
                </div>
            </div>
       
    )
}



export default connect(null,{resetDialoug})(conformationBody);