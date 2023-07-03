import authAxios from "../shared/axios";
import axios from "axios";
export default class GenerateService {
  static async getNumbers () {
    const response = await axios.get(
      "http://localhot:8080/api/phone/generate"
    );

    return response;
  }
}
