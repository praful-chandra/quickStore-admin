import {COUPON_ACTION} from "../actions/action.types";

import {addCoupon,editCoupon,deleteCoupon} from "../utils/coupon.util";

const INITIAL_STATE = {
    coupons : [],
    couponLoading : false,
    init : false
}

export default (state = INITIAL_STATE,action)=>{
    
    switch (action.type){

        case COUPON_ACTION.COUPON_LOADING: return{
            ...state,
            couponLoading : true,
            init : true
        }
        case COUPON_ACTION.COUPON_LOADING_DONE : return{
            ...state,
            couponLoading:false
        }
        case COUPON_ACTION.GET_COUPON : return {
            ...state,
            coupons : action.payload
        }
        case COUPON_ACTION.CREATE_COUPON : return {
            ...state,
            coupons : addCoupon(state.coupons, action.payload)
        }
        case COUPON_ACTION.EDIT_COUPON : return {
            ...state,
            coupons : editCoupon(state.coupons, action.payload)
        }
        case COUPON_ACTION.DELETE_COUPON : return {
            ...state,
            coupons : deleteCoupon(state.coupons , action.payload)
        }

        default : return state
    }
}