import axios from "axios";

export const FreeApi = async () => {
    const response = await axios.get('http://63fa69b9897af748dccebef2.mockapi.io/items');

    return response.data;
}

export const CreateProducts = async (data: {name: string, price: number}) => {
    const response = await axios.post('http://63fa69b9897af748dccebef2.mockapi.io/items', data);

    return response;
}