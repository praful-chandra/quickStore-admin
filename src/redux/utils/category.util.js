export const addCategory = (allCategorys,newCategory)=>{


    allCategorys = [...allCategorys,{...newCategory}];

    

    return allCategorys;

}
