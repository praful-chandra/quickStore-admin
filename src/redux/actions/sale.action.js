import axios from "axios";

import { SALE_ACTION } from "./action.types";

const saleLoading = () => ({
  type: SALE_ACTION.SALE_LOADING,
});

const saleLoadingDone = () => ({
  type: SALE_ACTION.SALE_LOADING_DONE,
});

const createSale = (newSale) => ({
  type: SALE_ACTION.CREATE_SALE,
  payload: newSale,
});

const getSale = (sales) => ({
  type: SALE_ACTION.GET_SALE,
  payload: sales,
});

const editSale = (editedSale) => ({
  type: SALE_ACTION.EDIT_SALE,
  payload: editedSale,
});

const deleteSale = (saleId) => ({
  type: SALE_ACTION.DELETE_SALE,
  payload: saleId,
});

export const getSaleAsync = (options) => async (dispatch) => {
  dispatch(saleLoading());
  try {
    const sales = await axios.post("/api/admin/get/allsale", options);

    dispatch(getSale(sales.data));
  } catch (err) {
    alert(err.response.data);
  } finally {
    dispatch(saleLoadingDone());
  }
};

export const createSaleAsync = (newSale, raw) => async (dispatch) => {
  dispatch(saleLoading());

  try {
    const createdSale = await axios.post("/api/admin/shop/addsale", newSale);
    console.log(createdSale);

    dispatch(createSale({ ...raw, _id: createdSale.data._id }));
  } catch (err) {
    alert(err.response.data.error);
  } finally {
    dispatch(saleLoadingDone());
  }
};

export const editSaleAsync = (updatedSale, raw) => async (dispatch) => {
  dispatch(saleLoading());

  try {
    await axios.patch("/api/admin/shop/updatesale", updatedSale);

    dispatch(editSale(raw));
  } catch (err) {
    alert(err.response.data.error);
  } finally {
    dispatch(saleLoadingDone());
  }
};

export const deleteSaleAsync = (saleId) => async (dispatch) => {
  dispatch(saleLoading());

  try {
    await axios.delete("/api/admin/shop/deletesale", { data: { _id: saleId } });

    dispatch(deleteSale(saleId));
  } catch (err) {
    alert(err.response.data.error);
  } finally {
    dispatch(saleLoadingDone());
  }
};
