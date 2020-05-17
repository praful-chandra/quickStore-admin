import {PRODUCTS_ACTION} from "../actions/action.types"

import {editProduct} from "../utils/product.util"

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
        case PRODUCTS_ACTION.EDIT_PRODUCT : return{
            ...state,
            products : editProduct(state.products,action.payload)
        }

        default : return state
    }

}

export default ProductReducer;