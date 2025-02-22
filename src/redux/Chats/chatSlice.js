import { createSlice } from "@reduxjs/toolkit";

// Hàm để lấy dữ liệu từ localStorage
const loadMessagesFromLocalStorage = () => {
  const messages = localStorage.getItem("chatMessages");
  return messages ? JSON.parse(messages) : [];
};

//Khởi tạo 1 slice trong kho luu trữ Redux Store
export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: loadMessagesFromLocalStorage(), // Tải dữ liệu từ localStorage khi khởi tạo
  },
  //Reducers: Nơi chứa các xử lý dữ liệu đồng bộ
  reducers: {
    addMessage: (state, action) => {
      // Thêm tin nhắn mới vào danh sách tin nhắn
      const newMessage = action.payload;
      state.messages = [...state.messages, newMessage];
      localStorage.setItem("chatMessages", JSON.stringify(state.messages)); // Lưu vào localStorageư
      window.dispatchEvent(new Event("storage")); // Gửi sự kiện storage để cập nhật dữ liệu trên các tab khác
    },
    setMessages: (state, action) => {
      // Cập nhật danh sách tin nhắn từ localStorage
      state.messages = action.payload;
    },
    //update message khi tin nhắn được đọc
    updateIsReadMessage: (state, action) => {
      // Cập nhật trạng thái tin nhắn đã đọc khi người dùng click card chat của người đó để xem tin nhắn của người đó
      state.messages = state.messages.map((msg) =>
        msg.receiver === action.payload.receiver
          ? { ...msg, isRead: true }
          : msg
      );
      localStorage.setItem("chatMessages", JSON.stringify(state.messages)); // Lưu vào localStorage
      window.dispatchEvent(new Event("storage")); // Gửi sự kiện storage để cập nhật dữ liệu trên các tab khác
    },
  },
});

//Actions: Nơi chứa các hàm gọi dispatch để thực hiện các hành động trong reducers
export const { addMessage, updateIsReadMessage, setMessages } =
  chatSlice.actions;

//Selector: Nơi chứa các hàm lấy dữ liệu từ redux
export const selectMessages = (state) => state.chat.messages;

export const chatReducer = chatSlice.reducer;
