import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkwhatsAppNumber,
  downloadFile,
  generatePhoneNumbers,
  sendwhatsAppMessage,
  uploadFile,
} from "./generateService";
import {
  checkLoading,
  downloadLoading,
  fileLoading,
  getFileResutlts,
  getNumberRegistered,
  getNumbers,
  setgenerateLoading,
  loadingMessage,
} from "./generateReducer";
export const generateNumbers = createAsyncThunk<void, string>(
  "generate/generateNumbers",
  async (country, thunkAPI) => {
    try {
      thunkAPI.dispatch(setgenerateLoading(true));
      const phoneNumbers = await generatePhoneNumbers(country);
      thunkAPI.dispatch(getNumbers(phoneNumbers));
      thunkAPI.dispatch(setgenerateLoading(false));
    } catch (error) {
      thunkAPI.dispatch(setgenerateLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);

export const checkWhatsApp = createAsyncThunk<void, string>(
  "generate/checkWhatsApp",
  async (numbers, thunkAPI) => {
    try {
      thunkAPI.dispatch(checkLoading(true));
      const response = await checkwhatsAppNumber(numbers);
      thunkAPI.dispatch(getNumberRegistered(response));
      thunkAPI.dispatch(checkLoading(false));
    } catch (error) {
      thunkAPI.dispatch(checkLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);

export const sendMessage = createAsyncThunk<
  void,
  { messages: string; phoneNumbers: String[] }
>("generate/sendMessage", async ({ messages, phoneNumbers }, thunkAPI) => {
  try {
    thunkAPI.dispatch(loadingMessage(false));
    await sendwhatsAppMessage(messages, phoneNumbers);
    thunkAPI.dispatch(loadingMessage(true));
  } catch (error) {
    thunkAPI.dispatch(loadingMessage(false));
  }
});

export const uploadcsv = createAsyncThunk<void, File>(
  "/generate/upload",
  async (file, thunkAPI) => {
    try {
      thunkAPI.dispatch(fileLoading(true));
      const response = await uploadFile(file);
      thunkAPI.dispatch(getFileResutlts(response));
      thunkAPI.dispatch(fileLoading(false));
    } catch (error) {
      thunkAPI.dispatch(fileLoading(false));
    }
  }
);

export const download = createAsyncThunk<void, any>(
  "/generate/download",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(downloadLoading(true));
      await downloadFile(data);
      thunkAPI.dispatch(downloadLoading(false));
    } catch (error) {
      thunkAPI.dispatch(downloadLoading(false));
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }
);
