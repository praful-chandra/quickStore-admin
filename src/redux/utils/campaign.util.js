export const addCampaign = (allCampaign , newCampaign) =>{
    return [...allCampaign,newCampaign];
}

export const editCampaign = (allCampaign , editedCampaign) =>{
    return allCampaign.map((camp)=>camp._id === editedCampaign._id ?  editedCampaign : camp );
}