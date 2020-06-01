export const addCampaign = (allCampaign , newCampaign) =>{
    return [...allCampaign,newCampaign];
}

export const editCampaign = (allCampaign , editedCampaign) =>{
    return allCampaign.map((camp)=>camp._id === editedCampaign._id ?  editedCampaign : camp );
}

export const deleteCampaign = (allCampaign,campId)=> allCampaign.filter(camp => camp._id !== campId);