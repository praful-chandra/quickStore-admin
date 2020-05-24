import {combineReducers} from "redux";

import userReducer from "./userReducer";
import productsReducer from "./products.reducer";
import categoryReducer from "./category.reducer"
import campaignReducer from "./campaign.reducer";
import overlayReducer from "./overlay.reducer";
import leftBarReducer from "./leftBar.reducer";
import saleReducer from "./sales.reducer";
const rootReducer = combineReducers({

    user : userReducer,
    products : productsReducer,
    category : categoryReducer,
    campaign : campaignReducer,
    sale : saleReducer,
    overlay : overlayReducer,
    leftBar : leftBarReducer,
})


export default rootReducer;