export const editProduct = (allProducts,updatedProduct) =>{
console.log(updatedProduct);

   const updatedAllProducts = allProducts.map((prod)=>prod._id === updatedProduct._id ?  {...updatedProduct} : prod );

    return [...updatedAllProducts];

}