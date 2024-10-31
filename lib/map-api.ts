import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_IDEAL_API_KEY;
console.log("api key", API_KEY);


export const fetchAddressData = async (postcode: string) => {
  try {
    const response = await axios.get(`https://api.ideal-postcodes.co.uk/v1/postcodes/${postcode}`, {
      params: { api_key: API_KEY },
    });
    console.log("response:", response);
    
    return response.data.result;
  } catch (error) {
    console.error("Error fetching address data:", error);
    throw error;
  }
};
