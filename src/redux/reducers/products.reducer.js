import {PRODUCTS_ACTION} from "../actions/action.types"

const INITIAL_STATE = {
   products : [],
   productsLoading : false
}

const ProductReducer = (state = INITIAL_STATE , action)=>{


    switch(action.type){

        case PRODUCTS_ACTION.PRODUCTS_LOADING : return{
            ...state,
            productsLoading : true
        }

        case PRODUCTS_ACTION.PRODUCTS_LOADING_DONE : return{
            ...state,
            productsLoading : false
        }

        case PRODUCTS_ACTION.GET_PRODUCTS : return{
            ...state,
            products : action.payload
        }

        default : return state
    }

}

export default ProductReducer;