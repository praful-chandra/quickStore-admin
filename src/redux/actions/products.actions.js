import axios from "axios";
import {PRODUCTS_ACTION} from "./action.types";



 const loadProducts = ()=>({
    type : PRODUCTS_ACTION.PRODUCTS_LOADING,
});

 const loadProductsDone = ()=>({
    type : PRODUCTS_ACTION.PRODUCTS_LOADING_DONE
})

 const getProducts = products => ({
    type : PRODUCTS_ACTION.GET_PRODUCTS,
    payload : products
})

export const getProductsAsync = (options)=> async dispatch=>{
    dispatch(loadProducts());
    
   try{

    const products = await axios.post("/api/admin/get/allproducts",options)

    dispatch(getProducts(products.data));

   }
   catch(err){
    // console.log(err.response);
    
   }
   finally{
    dispatch(loadProductsDone())

   }


}