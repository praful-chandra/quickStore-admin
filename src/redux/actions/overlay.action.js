import {OVERLAY_ACTIONS} from "./action.types";


export const showOverlay = (overlayContent) =>({
    type : OVERLAY_ACTIONS.SHOW_OVERLAY,
    payload : overlayContent
})

export const hideOverlay = () =>({
    type : OVERLAY_ACTIONS.HIDE_OVERLAY
})