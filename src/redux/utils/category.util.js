export const addCategory = (allCategorys,newCategory)=>{


    allCategorys = [...allCategorys,{...newCategory}];

    

    return allCategorys;

}

export const editCategory = (allCategory,updatedCategory) =>{

    console.log();
    

    return allCategory.map((cate)=>cate._id === updatedCategory._id ?  {...updatedCategory} : cate );


}