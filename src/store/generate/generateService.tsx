import axios from "axios";

export const generatePhoneNumbers = async (country: any, much: any) => {
  try {
    const response = await axios.post(
      "http://192.168.1.43:8080/api/phone/generate",
      { country: country, much: much }
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
      "http://192.168.1.43:8080/api/phone/save",
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

export const sendwhatsAppMessage = async (
  time: any,
  message: any,
  phoneNumbers: any
) => {
  try {
    const response = await axios.post(
      "http://192.168.1.43:8080/api/phone/message",
      { time: time, message: message, phoneNumbers: phoneNumbers }
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
      "http://192.168.1.43:8080/api/phone/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  } catch (error) {}
};

export const downloadFile = async (data) => {
  try {
    const response = await axios.post(
      "http://192.168.1.43:8080/api/phone/download",
      {
        phoneNumbers: data,
      },
      {
        responseType: "blob", // Set the response type to 'blob' to receive the file as a blob object
      }
    );
    const blob = new Blob([response.data], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "downloaded_numbers.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading CSV file:", error);
  }
};
