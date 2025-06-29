import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });

      //   console.log(response.data); // ✅ Fixed typo

      if (!response.data.success) {
        // Server responded with success: false
        toast.error(response.data?.message || "Login failed");
        return rejectWithValue(response.data?.message || "Login failed");
      }
      toast.success("Login successfully!");
      return response.data; // Only returns if success is true
    } catch (err) {
      const errorOutput =
        err?.response?.data?.message || "Something went wrong";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/signup",
  async ({fullname, gender,email, username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        username,
        password,
        fullname,
        gender,
        email
      });

      if (!response.data?.success) {
        toast.error(response.data?.message || "Signup failed");
        return rejectWithValue(response.data?.message || "Signup failed");
      }
      toast.success("Account created successfully!");
      // console.log("register thunk", response.data.responseData)=
      return response.data; // Only returns if success is true
    } catch (err) {
      const errorOutput =
        err?.response?.data?.message || "Something went wrong";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("Logout successfully!");
      return response.data; // Only returns if success is true
    } catch (err) {
      const errorOutput =
        err?.response?.data?.message || "Something went wrong";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);


export const getProfileThunk = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/me");
      return response.data; 
    } catch (err) {
      const errorOutput =
        err?.response?.data?.message || "Something went wrong";
      // toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/others",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/others");
      return response.data; 
    } catch (err) {
      const errorOutput =
        err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorOutput);
    }
  }
);