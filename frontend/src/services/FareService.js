import apiClient from "../api/apiClient";

export const getZones = async () => {
    try{
        const zones = await apiClient.get('/zones');
        return zones.data;
    }
    catch (e) {
        console.log(e);
        throw error;
    }

}

export const calculateFares = async (payload) => {
    try {
        const fareTotal = await apiClient.post('/calculate-fares', payload);
        return fareTotal.data;
    }
    catch (e) {
        console.log(e);
        throw error;
    }
}