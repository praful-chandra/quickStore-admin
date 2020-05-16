import {USER_ACTIONS} from "../actions/action.types";

const INITIAL_STATE = {
    user : null,
    userLoading : false,
    userError : null
}

const userReducer = (state = INITIAL_STATE , action)=>{


    switch(action.type){

        case USER_ACTIONS.USER_LOADING : return{
            ...state,
            userLoading : true
        }

        case USER_ACTIONS.USER_LOADING_DONE : return{
            ...state,
            userLoading : false
        }

        case USER_ACTIONS.USER_SIGNIN : return{
            ...state,
            user : action.payload,
            userError : null
        }

        case USER_ACTIONS.USER_ERROR_LOAD : return{
            ...state,
            userError : action.payload
        }

        case USER_ACTIONS.USER_ERROR_ERASE : return{
            ...state,
            userError : null
        }

        default : return state
    }

}

export default userReducer;