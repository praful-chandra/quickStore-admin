export const addSale = (allSales,newSale)=>[...allSales,newSale];

export const editSale = (allSales,updatedSale) => allSales.map(sale => sale._id === updatedSale._id ? updatedSale : sale);
