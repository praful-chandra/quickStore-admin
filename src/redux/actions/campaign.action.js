import axios from "axios";

import { CAMPAIGN_ACTION } from "./action.types";

const campaignLoad = () => ({
  type: CAMPAIGN_ACTION.CAMPAIGN_LOADING,
});

const campaignLoadDone = () => ({
  type: CAMPAIGN_ACTION.CAMPAIGN_LOADING_DONE,
});

const getCampaign = (campaigns) => ({
  type: CAMPAIGN_ACTION.GET_CAMPAIGN,
  payload: campaigns,
});

const createCampaign = (campaign) => ({
  type: CAMPAIGN_ACTION.CREATE_CAMPAIGN,
  payload: campaign,
});

const editCampaign  = campaign =>({
    type : CAMPAIGN_ACTION.EDIT_CAMPAIGN,
    payload : campaign
})

const deleteCampaign = campId =>({
  type : CAMPAIGN_ACTION.DELETE_CAMPAIGN,
  payload : campId
})

export const getCampaignASync = (options) => async (dispatch) => {
  dispatch(campaignLoad());

  try {
    const campaigns = await axios.post("/api/admin/get/allcampaign", options);
    dispatch(getCampaign(campaigns.data));
  } catch (err) {
    alert("an error occured - campaign");
  } finally {
    dispatch(campaignLoadDone());
  }
};

export const createCampaignAsync = (campaign, raw) => async (dispatch) => {
  dispatch(campaignLoad());

  try {
   const newCampaign =  await axios.post("/api/admin/shop/addCampaign", campaign);
    dispatch(createCampaign({ ...raw, _id: newCampaign.data._id }));
  } catch (err) {
    alert(err.response.data.error);
  } finally {
    dispatch(campaignLoadDone());
  }
};


export const editCampaignAsync = (campaign , raw) => async(dispatch)=>{



    dispatch(campaignLoad())
    try{

       await axios.patch("/api/admin/shop/updatecampaign",campaign,{
        headers: {
          "content-type": "multipart/form-data",
        },
      });      
        dispatch(editCampaign(raw));

    } catch (err) {
        console.log(err);
        
      } finally {
        dispatch(campaignLoadDone());
      }
}

export const deleteCampaignAsync = (campId)=> async dispatch=>{
  dispatch(campaignLoad());

  try{
    await axios.delete("/api/admin/shop/deletecampaign",{data :{_id : campId}});
    dispatch(deleteCampaign(campId));
  }
  catch (err) {
    console.log(err);
    
  } finally {
    dispatch(campaignLoadDone());
  }
}

