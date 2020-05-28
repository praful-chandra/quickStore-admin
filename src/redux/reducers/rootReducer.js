import {combineReducers} from "redux";

import userReducer from "./userReducer";
import productsReducer from "./products.reducer";
import categoryReducer from "./category.reducer"
import campaignReducer from "./campaign.reducer";
import saleReducer from "./sales.reducer";
import couponReducer from "./coupon.reducer";
import overlayReducer from "./overlay.reducer";
import leftBarReducer from "./leftBar.reducer";
import ConfirmationReducer from "./conformation.reducer";

const rootReducer = combineReducers({

    user : userReducer,
    products : productsReducer,
    category : categoryReducer,
    campaign : campaignReducer,
    sale : saleReducer,
    coupon : couponReducer,
    overlay : overlayReducer,
    leftBar : leftBarReducer,
    confirmation : ConfirmationReducer
})


export default rootReducer;