import axios from "axios";

export const generatePhoneNumbers = async () => {
  try {
    const response = await axios.get(
      "http://192.168.10.57:8080/api/phone/generate"
    );
    return response.data;
  } catch (error) {
    console.log("Error generating phone numbers", error);
    throw error;
  }
};
