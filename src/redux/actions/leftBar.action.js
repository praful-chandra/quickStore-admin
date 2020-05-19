import {LEFT_BAR} from "./action.types";

export const switchTab = tab =>({
    type : LEFT_BAR.SWITCH_TAB,
    payload : tab
})