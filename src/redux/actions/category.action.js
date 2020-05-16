import axios from "axios";
import {CATEGORY_ACTION} from "./action.types";



 const loadCategory = ()=>({
    type : CATEGORY_ACTION.CATEGORY_LOADING,
});

 const loadCategoryDone = ()=>({
    type : CATEGORY_ACTION.CATEGORY_LOADING_DONE
})

 const getCategory = Category => ({
    type : CATEGORY_ACTION.GET_CATEGORY,
    payload : Category
})

export const getCategoryAsync = (options)=> async dispatch=>{
    dispatch(loadCategory());
    
   try{

    const Category = await axios.post("/api/admin/get/allCategories",options)

    dispatch(getCategory(Category.data));

   }
   catch(err){
    // console.log(err.response);
    
   }
   finally{
    dispatch(loadCategoryDone())

   }


}