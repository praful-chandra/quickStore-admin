import axios from "axios";

import { COUPON_ACTION } from "./action.types";

const couponLoading = () => ({
  type: COUPON_ACTION.COUPON_LOADING,
});

const couponLoadingDone = () => ({
  type: COUPON_ACTION.COUPON_LOADING_DONE,
});

const getCoupons = (coupons) => ({
  type: COUPON_ACTION.GET_COUPON,
  payload: coupons,
});

const editCoupons = (coupon) => ({
  type: COUPON_ACTION.EDIT_COUPON,
  payload: coupon,
});

const createCoupon = newCoupon =>({
    type : COUPON_ACTION.CREATE_COUPON,
    payload : newCoupon
})

const deleteCoupon = coupId =>({
  type :COUPON_ACTION.DELETE_COUPON,
  payload : coupId
})

export const getCouponAsync = (options) => async (dispatch) => {
  dispatch(couponLoading());

  try {
    const coupons = await axios.post("/api/admin/get/allcoupon", options);
    
    dispatch(getCoupons(coupons.data));
  } catch (err) {
    alert(err.response.data.error);
  } finally {
    dispatch(couponLoadingDone());
  }
};


export const editCouponAsync = (editedCoupon) => async dispatch =>{
    dispatch(couponLoading());

    try {
      await axios.patch("/api/admin/shop/updateCoupon", editedCoupon);
  
      dispatch(editCoupons(editedCoupon));
      

    } catch (err) {
      
      alert(err);
    } finally {
      dispatch(couponLoadingDone());
    }
}

export const createCouponAsync = (newCoupon ) => async dispatch =>{
    dispatch(couponLoading());

    try {
    const coupon =   await axios.post("/api/admin/shop/addcoupon", newCoupon);
  
      dispatch(createCoupon({...newCoupon,_id : coupon.data._id,createdAt : new Date()}));
    } catch (err) {
      alert(err.response.data.error);
    } finally {
      dispatch(couponLoadingDone());
    }
}

export const deleteCouponAsync = (coupId ) => async dispatch =>{
  dispatch(couponLoading());

  try {

    await axios.delete("/api/admin/shop/deleteCoupon",{data : {_id : coupId}});
    dispatch(deleteCoupon(coupId));

  } catch (err) {
    alert(err.response.data.error);
  } finally {
    dispatch(couponLoadingDone());
  }
}