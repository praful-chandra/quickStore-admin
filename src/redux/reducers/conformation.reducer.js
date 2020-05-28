import {CONFIRMATION_ACTION} from "../actions/action.types"

const INITIAL_STATE = {
    status : false,
    content : null
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){

        case CONFIRMATION_ACTION.CONFIRMATION_STATUS :return {
            ...state,
            status : true,
            content : action.payload

        }



        case CONFIRMATION_ACTION.CONFIRMATION_RESET : return INITIAL_STATE
        default: return state;
    }
}