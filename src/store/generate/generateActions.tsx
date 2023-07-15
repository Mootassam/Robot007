import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkwhatsAppNumber,
  generatePhoneNumbers,
  uploadFile,
} from "./generateService";
import {
  checkLoading,
  fileLoading,
  getFileResutlts,
  getNumberRegistered,
  getNumbers,
  setgenerateLoading,
} from "./generateReducer";
export const generateNumbers = createAsyncThunk(
  "generate/generateNumbers",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setgenerateLoading(true));
      const phoneNumbers = await generatePhoneNumbers();
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
      const response = await checkwhatsAppNumber(numbers);
      thunkAPI.dispatch(getNumberRegistered(response));
      thunkAPI.dispatch(checkLoading(false));
    } catch (error) {
      thunkAPI.dispatch(checkLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);

export const uploadcsv = createAsyncThunk<void, File>(
  "/generate/upload",
  async (file, thunkAPI) => {
   console.log('====================================');
   console.log(file);
   console.log('====================================');
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
