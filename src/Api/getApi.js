import axios from "axios"

export const getApi = async({url, endpoint, params = {}, apiToken,setError}) => {
    try{

        if(apiToken == undefined){
            throw new Error(`Error: El token es obligatorio`);
        }
        
        const response = await axios.post(url, JSON.stringify(params),
        {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response;
        
    } catch(error){
        setError(error);
    }
};