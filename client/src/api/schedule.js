import axios from "./axios";

export const getScheduleDataForClient = async(email, url) => {
    try{
        const { data } = await axios.get(`/schedule/${email}/${url}`);
        console.log(data);
        return data || {}
    }catch(err){
        console.log(err);
        return {}
    }
}