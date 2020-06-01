import {SALE_ACTION} from "../actions/action.types";

import {addSale,editSale,deleteSale} from "../utils/sale.util";

const INITIAL_STATE = {
    sales : [],
    saleLoading : false,
    init : false
}

export default (state  = INITIAL_STATE , action)=>{
    switch (action.type){

        case SALE_ACTION.SALE_LOADING : return {
            ...state,
            saleLoading : true,
            init : true
        }
        case SALE_ACTION.SALE_LOADING_DONE : return {
            ...state,
            saleLoading : false
        }

        case SALE_ACTION.GET_SALE : return {
            ...state,
            sales : action.payload
        }

        case SALE_ACTION.CREATE_SALE : return {
            ...state,
            sales : addSale(state.sales,action.payload)
        }

        case SALE_ACTION.EDIT_SALE : return {
            ...state,
            sales : editSale(state.sales,action.payload)
        }
        case SALE_ACTION.DELETE_SALE : return {
            ...state,
            sales : deleteSale(state.sales,action.payload)
        }

        default : return state
    }
}