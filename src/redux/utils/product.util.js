export const editProduct = (allProducts,updatedProduct) =>{

   const updatedAllProducts = allProducts.map((prod)=>prod._id === updatedProduct._id ?  {...updatedProduct} : prod );

    return [...updatedAllProducts];

}


export const addProduct = (allProducts,newProduct)=>{


    allProducts = [...allProducts,{...newProduct}];

    

    return allProducts;

}

export const appendProducts = (allProducts , newProducts)=>{
    allProducts = allProducts.concat([...newProducts]);

    return allProducts;
}

export const deleteProduct = (allProducts , deleteProdId)=>{
    const prod = allProducts.filter(prod=> prod._id !== deleteProdId);
    return prod;
    
}

export const deleteProductsUnderCategory = (allProducts,cateId)=>{
    const newProducts = allProducts.filter(prod => prod.categoryId !== cateId)
    const length = allProducts.length -  newProducts.length;    
    return{
        products : newProducts,
        length
    }
}