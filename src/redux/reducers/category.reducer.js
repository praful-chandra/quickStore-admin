import {CATEGORY_ACTION} from "../actions/action.types"
import {addCategory} from "../utils/category.util";
const INITIAL_STATE = {
   category : [],
   categoryLoading : false,
   categoryFetched : false,
   init : false
}


const CategoryReducer = (state = INITIAL_STATE , action)=>{


    switch(action.type){

        case CATEGORY_ACTION.CATEGORY_LOADING : return{
            ...state,
            categoryLoading : true,
            init : true
        }

        case CATEGORY_ACTION.CATEGORY_LOADING_DONE : return{
            ...state,
            categoryLoading : false
        }

        case CATEGORY_ACTION.GET_CATEGORY : return{
            ...state,
            category : action.payload,
            categoryFetched : true
        }

        case CATEGORY_ACTION.CREATE_CATEGORY : return{
            ...state,
            category : addCategory(state.category,action.payload)
        }

        default : return state
    }

}

export default CategoryReducer;