import authAxios from "../shared/axios";
import axios from "axios";
export default class GenerateService {
  static async getNumbers() {
    try {
      const response = await axios.get(
        "http://192.168.70.133:8080/api/phone/generate"
      );
      return response;
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }

  static async checkWhatsApp(numbers: any) {
    try {
      const reponse = await axios.post(
        "http://192.168.70.133:8080/api/phone/save",
        {
          users: numbers,
        }
      );
      return reponse;
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }
}
