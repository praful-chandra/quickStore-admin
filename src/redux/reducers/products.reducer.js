import {PRODUCTS_ACTION} from "../actions/action.types"

import {editProduct,addProduct,appendProducts} from "../utils/product.util"

const INITIAL_STATE = {
   products : [],
   productsLoading : false,
   init : false,
   totalCount : 0
}

const ProductReducer = (state = INITIAL_STATE , action)=>{


    switch(action.type){

        case PRODUCTS_ACTION.PRODUCTS_LOADING : return{
            ...state,
            productsLoading : true,
            init : true

        }

        case PRODUCTS_ACTION.PRODUCTS_LOADING_DONE : return{
            ...state,
            productsLoading : false
        }

        case PRODUCTS_ACTION.GET_PRODUCTS : return{
            ...state,
            products : action.payload.neww ? action.payload.items : appendProducts(state.products, action.payload.items),
            totalCount : action.payload.totalCount
        }
        case PRODUCTS_ACTION.EDIT_PRODUCT : return{
            ...state,
            products : editProduct(state.products,action.payload)
        }
        case PRODUCTS_ACTION.CREATE_PRODUCT : return{
            ...state,
            products : addProduct(state.products,action.payload)
        }

        default : return state
    }

}

export default ProductReducer;