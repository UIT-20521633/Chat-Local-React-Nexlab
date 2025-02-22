// features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { mockUsers } from "../../apis/mockUser";

const initialState = {
  currentUser: mockUsers[0], // Người dùng hiện tại
  users: mockUsers, // Danh sách người dùng
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload; // Cập nhật người dùng hiện tại
    },
    setUsers: (state, action) => {
      state.users = action.payload; // Cập nhật danh sách người dùng
    },
    // Thay đổi người dùng hiện tại
    switchUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser, setUsers, switchUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser; // Selector để lấy người dùng hiện tại
export const selectUsers = (state) => state.user.users; // Selector để lấy danh sách người dùng
export const userReducer = userSlice.reducer;
