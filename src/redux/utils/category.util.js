export const addCategory = (allCategorys,newCategory)=>{


    allCategorys = [...allCategorys,{...newCategory}];

    

    return allCategorys;

}

export const editCategory = (allCategory,updatedCategory) =>{

    

    return allCategory.map((cate)=>cate._id === updatedCategory._id ?  {...updatedCategory} : cate );


}

export const deleteCategory = (allCategory , cateId) => allCategory.filter((cate)=>cate._id !== cateId);