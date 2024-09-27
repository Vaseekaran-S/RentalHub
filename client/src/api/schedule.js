import axios from "./axios";

export const getScheduleDataForClient = async(email, url) => {
    try{
        const response = await axios.get(`/schedule/${email}/${url}`)
        const data = response?.data
        console.log(data);
        return data || {}
    }catch(err){
        console.log(err);
        return {}
    }
}