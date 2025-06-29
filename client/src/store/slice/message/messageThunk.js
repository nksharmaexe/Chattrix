import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message
      });
      return response.data; // Only returns if success is true
    } catch (err) {
      const errorOutput =
        err?.response?.data?.message || "Something went wrong";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "message/chats",
  async ({ receiverId}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/chats/${receiverId}`);
      return response.data; 
    } catch (err) {
      const errorOutput =
        err?.response?.data?.message || "Something went wrong";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

