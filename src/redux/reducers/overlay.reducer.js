import { OVERLAY_ACTIONS } from "../actions/action.types";

const INITIAL_STATE = {
  overlay: false,
  overayContent : null
};

export default  (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OVERLAY_ACTIONS.SHOW_OVERLAY:
      return { ...state, overlay: true ,overayContent : action.payload};
    case OVERLAY_ACTIONS.HIDE_OVERLAY:
      return { ...state, overlay: false , overayContent : null};

    default:
      return state;
  }
};
