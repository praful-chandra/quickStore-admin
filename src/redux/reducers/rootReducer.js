import {combineReducers} from "redux";

import userReducer from "./userReducer";
import productsReducer from "./products.reducer";
import categoryReducer from "./category.reducer"
import overlayReducer from "./overlay.reducer";
import leftBarReducer from "./leftBar.reducer";

const rootReducer = combineReducers({

    user : userReducer,
    products : productsReducer,
    category : categoryReducer,
    overlay : overlayReducer,
    leftBar : leftBarReducer
})


export default rootReducer;