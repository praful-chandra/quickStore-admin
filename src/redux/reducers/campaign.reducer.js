import {CAMPAIGN_ACTION} from "../actions/action.types";

import {addCampaign,editCampaign,deleteCampaign} from "../utils/campaign.util";

const INITIAL_STATE = {
    campaigns: [],
    campaignLoading : false,
    init : false
}

export default (state = INITIAL_STATE, action)=>{
    switch (action.type){

        case CAMPAIGN_ACTION.CAMPAIGN_LOADING : return{
            ...state,
            campaignLoading : true,
            init : true
        }

        case CAMPAIGN_ACTION.CAMPAIGN_LOADING_DONE : return{
            ...state,
            campaignLoading : false
        }

        case CAMPAIGN_ACTION.GET_CAMPAIGN : return {
            ...state,
            campaigns : action.payload
        }

        case CAMPAIGN_ACTION.CREATE_CAMPAIGN : return{
            ...state,
            campaigns : addCampaign(state.campaigns,action.payload)
        }

        case CAMPAIGN_ACTION.EDIT_CAMPAIGN : return {
            ...state,
            campaigns : editCampaign(state.campaigns,action.payload)
        }

        case CAMPAIGN_ACTION.DELETE_CAMPAIGN : return{
            ...state,
            campaigns : deleteCampaign(state.campaigns,action.payload)
        }

        default : return state
    }
}