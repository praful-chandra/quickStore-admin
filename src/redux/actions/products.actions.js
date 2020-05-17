import axios from "axios";
import { PRODUCTS_ACTION } from "./action.types";

const loadProducts = () => ({
  type: PRODUCTS_ACTION.PRODUCTS_LOADING,
});

const loadProductsDone = () => ({
  type: PRODUCTS_ACTION.PRODUCTS_LOADING_DONE,
});

const getProducts = (products) => ({
  type: PRODUCTS_ACTION.GET_PRODUCTS,
  payload: products,
});

const editProducts = (product) => ({
  type: PRODUCTS_ACTION.EDIT_PRODUCT,
  payload: product,
});

export const getProductsAsync = (options) => async (dispatch) => {
  dispatch(loadProducts());

  try {
    const products = await axios.post("/api/admin/get/allproducts", options);

    dispatch(getProducts(products.data));
  } catch (err) {
    // console.log(err.response);
  } finally {
    dispatch(loadProductsDone());
  }
};

export const editProductAsync = (data,raw) => async (dispatch) => {
  dispatch(loadProducts());

  try {
    const products = await axios.patch("/api/admin/shop/updateproduct", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    dispatch(editProducts(raw));
  } catch (err) {
    console.log(err.response.data);
  } finally {
    dispatch(loadProductsDone());
  }
};
