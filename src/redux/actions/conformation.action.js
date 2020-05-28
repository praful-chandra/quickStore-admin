import { CONFIRMATION_ACTION } from "./action.types";

export const showDialog = (content) => ({
  type: CONFIRMATION_ACTION.CONFIRMATION_STATUS,
     payload : content

});


export const resetDialoug = () => ({
  type: CONFIRMATION_ACTION.CONFIRMATION_RESET,
});

