export const addCoupon = (allCOupons , newCoupon)=> [...allCOupons,newCoupon];

export const editCoupon = (allCoupons, editedCoupon) => allCoupons.map(coupon => coupon._id === editedCoupon._id ? editedCoupon : coupon);