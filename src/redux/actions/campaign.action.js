import axios from "axios";

import {CAMPAIGN_ACTION} from "./action.types";


const campaignLoad = ()=>({
    type : CAMPAIGN_ACTION.CAMPAIGN_LOADING
})

const campaignLoadDone = () =>({
    type : CAMPAIGN_ACTION.CAMPAIGN_LOADING_DONE
})

const getCampaign = campaigns =>({

type : CAMPAIGN_ACTION.GET_CAMPAIGN,
payload : campaigns

})

const createCampaign = campaign =>({
    type : CAMPAIGN_ACTION.CREATE_CAMPAIGN,
    payload : campaign
})

export const getCampaignASync = options => async dispatch =>{
    dispatch(campaignLoad());

    try{
        const campaigns = await axios.post("/api/admin/get/allcampaign",options);
        dispatch(getCampaign(campaigns.data));
    }
    catch (err){
        alert("an error occured - campaign")
    }
    finally{
        dispatch(campaignLoadDone())
    }
}

export const createCampaignAsync = (campaign,raw) => async dispatch =>{
    dispatch(campaignLoad());
    
    try{
        await axios.post("/api/admin/shop/addCampaign",campaign);
        dispatch(createCampaign({ ...raw, _id: Math.random() * 50 }));
    }
    catch (err){
        alert("an error occured - campaign")
    }
    finally{
        dispatch(campaignLoadDone())
    }
}