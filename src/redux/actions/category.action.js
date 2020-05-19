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

const addCategory = category =>({
    type : CATEGORY_ACTION.CREATE_CATEGORY,
    payload : category
})

const updateCategory = category =>({
    type : CATEGORY_ACTION.EDIT_CATEGORY,
    payload : category
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

export const addCategoryAsync = (newCategory,raw)=> async dispatch =>{
    dispatch(loadCategory());

    try{

         await axios.post("/api/admin/shop/addCategory",newCategory)
        const newCategoryRaw = { ...raw, _id: Math.random() * 50 , Products : [] }

        dispatch(addCategory(newCategoryRaw));
    
       }
       catch(err){
        // console.log(err.response);
        
       }
       finally{
        dispatch(loadCategoryDone())
    
       }

}

export const updateCategoryAsync = (updatedCategory,raw) => async dispatch =>{

    dispatch(loadCategory())

    try{

        await axios.patch("/api/admin/shop/updatecategory",updatedCategory)


       dispatch(updateCategory(raw));
   
      }
      catch(err){
       // console.log(err.response);
       
      }
      finally{
       dispatch(loadCategoryDone())
   
      }

}