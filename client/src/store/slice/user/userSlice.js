import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./userThunk";

const initialState = {
  isAuthenticated: false,
  screenLoading: true,
  userProfile: null,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
  otherUsers: null,
  buttonLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // Register user
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      console.log(action.payload?.responseData);
      state.userProfile = action.payload?.responseData?.newUser;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });

    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // Logout user
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.isAuthenticated = false;
      state.selectedUser = null;
      state.otherUsers = null;
      localStorage.clear();

      state.buttonLoading = false;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // Get user profile
    builder.addCase(getProfileThunk.pending, (state, action) => {});
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.userProfile = action.payload?.responseData;
    });
    builder.addCase(getProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    // Get other users profile
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {});
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
  },
});

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
