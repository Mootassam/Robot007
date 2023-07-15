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

export const checkwhatsAppNumber = async (numbers: any) => {
  try {
    const response = await axios.post(
      "http://192.168.10.57:8080/api/phone/save",
      {
        users: numbers,
      }
    );
    return response.data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("csvFile", file);
    const response = await axios.post(
      "http://192.168.10.57:8080/api/phone/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.upload;
  } catch (error) {}
};
