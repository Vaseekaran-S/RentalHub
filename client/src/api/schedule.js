import axios from "./axios";

export const getScheduleDataForClient = async(email, _id) => {
    try{
        const { data } = await axios.get(`/schedule/${email}/${_id}`);
        console.log(data);
        
        return data || {}
    }catch(err){
        console.log(err);
        return {}
    }
}