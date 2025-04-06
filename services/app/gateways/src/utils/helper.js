import axiosInstance from "../axiosinstance.js"

async function call_api(url, headers = {}, method = "GET", body = null) {
    try {
        const config = {
            method,
            url,
            headers,
        };
        
        if (body) {
            config.data = body;
        }
        console.log("config",config)
        const result = await axiosInstance(config);

        return result.data;
    } catch (error) {
        console.error("API Call Error::::", error.msg);
        throw error;
    }
}

export default call_api;