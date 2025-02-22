import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./Chats/chatSlice";
import { userReducer } from "./user/userSlice";

export default configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
  },
});
