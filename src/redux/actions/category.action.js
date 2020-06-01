import axios from "axios";
import {CATEGORY_ACTION} from "./action.types";

import {deleteProductsUnderCategory} from "./products.actions";


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

const deleteCategory = category =>({
    type :CATEGORY_ACTION.DELETE_CATEGORY,
    payload : category
})

export const incrementProduct = (cateId,prodId)=>({
    type : CATEGORY_ACTION.INCREMENT_PROD,
    payload : {category : cateId , product : prodId}
})

export const decrementProduct = (cateId,prodId)=>({
    type : CATEGORY_ACTION.DECREMENT_PROD,
    payload : {category : cateId , product : prodId}
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

        const category =  await axios.post("/api/admin/shop/addCategory",newCategory)
        const newCategoryRaw = { ...raw, _id: category.data._id, Products : [] }

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


export const deleteCategoryAsync = cateId => async dispatch =>{

    dispatch(loadCategory())

    try{

        await axios.delete("/api/admin/shop/deletecategory",{data : {_id : cateId}})


       dispatch(deleteCategory(cateId));
        dispatch(deleteProductsUnderCategory(cateId));
      }
      catch(err){
       alert("Error occured while deleting")
       
      }
      finally{
       dispatch(loadCategoryDone())
   
      }

}