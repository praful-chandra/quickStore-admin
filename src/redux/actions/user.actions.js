import axios from "axios";

import { USER_ACTIONS } from "./action.types";

const loadUser = () => ({
  type: USER_ACTIONS.USER_LOADING,
});

const loadUserDone = () => ({
  type: USER_ACTIONS.USER_LOADING_DONE,
});

const signInUser = (user) => ({
  type: USER_ACTIONS.USER_SIGNIN,
  payload: user,
});

const userErrorLoad = () => ({
  type: USER_ACTIONS.USER_ERROR_LOAD,
  payload: true,
});

const setaxiosHeader = (token) => {  
  axios.defaults.headers.common['Authorization']= token;

};

// Login with emailId and password from loginScreen
export const signInUserAsync = (userCred) => async (dispatch) => {
  dispatch(loadUser());
  try {
    const user = await axios.post("/api/admin/auth/login", userCred);
    dispatch(signInUser(user.data));
    const token = "Bearer " + user.data.token;
    localStorage.setItem("token",token);
    setaxiosHeader(token);
  } catch (err) {
    dispatch(userErrorLoad());
  } finally {
    dispatch(loadUserDone());
  }
};

//login with JWTToken from localstorage
export const signInIfAlreadySigned = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  setaxiosHeader(token);

  if (token) {
    dispatch(loadUser());

    axios
      .post(
        "/api/admin/auth/validate",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((user) => {
        dispatch(signInUser({ admin: user.data }));

        dispatch(loadUserDone());
      })
      .catch((err) => {
        dispatch(loadUserDone());

      });
  }
};
