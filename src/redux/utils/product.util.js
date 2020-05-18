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