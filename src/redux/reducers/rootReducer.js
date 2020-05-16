import {combineReducers} from "redux";

import userReducer from "./userReducer";
import productsReducer from "./products.reducer";
import categoryReducer from "./category.reducer"

const rootReducer = combineReducers({

    user : userReducer,
    products : productsReducer,
    category : categoryReducer
    

})


export default rootReducer;