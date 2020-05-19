import {LEFT_BAR} from "../actions/action.types";

const INITIAL_STATE = {
    tab  : 0
}

export default (state = INITIAL_STATE , action)=>{
    switch (action.type){

        case LEFT_BAR.SWITCH_TAB : return {...state,tab : action.payload}

        default: return state;

    }
}