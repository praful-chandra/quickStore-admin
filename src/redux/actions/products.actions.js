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

const createProduct = (newProduct) => ({
  type: PRODUCTS_ACTION.CREATE_PRODUCT,
  payload: newProduct,
});

export const getProductsAsync = (options, neww) => async (dispatch) => {
  dispatch(loadProducts());

  try {
    const products = await axios.post("/api/admin/get/allproducts", options);

    dispatch(
      getProducts({
        items: products.data.products,
        totalCount: products.data.totalCount,
        neww,
      })
    );
  } catch (err) {
    // console.log(err.response);
  } finally {
    dispatch(loadProductsDone());
  }
};

export const editProductAsync = (data, raw) => async (dispatch) => {
  dispatch(loadProducts());

  try {
    await axios.patch("/api/admin/shop/updateproduct", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    dispatch(editProducts(raw));
  } catch (err) {
    alert(err.response.data);
  } finally {
    dispatch(loadProductsDone());
  }
};

export const createProductAsync = (data, raw) => async (dispatch) => {
  dispatch(loadProducts());

  try {
    await axios.post("/api/admin/shop/addProduct", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const newProductRaw = { ...raw, _id: Math.random() * 50 }
    dispatch(createProduct(newProductRaw));
  } catch (err) {
    alert(err.response.data.error);
  } finally {
    dispatch(loadProductsDone());
  }
};
