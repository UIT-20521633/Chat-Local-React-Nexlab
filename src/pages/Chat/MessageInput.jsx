import { useState, useRef } from "react";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/Chats/chatSlice";
import { selectCurrentUser } from "../../redux/user/userSlice";

const MessageInput = ({ selectedUser }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const removeImg = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    //Kiêm tra xem có người dùng nào được chọn chưa và chọn người dùng hiện tại chưa
    if (!selectedUser) {
      toast.error("Please select a user to chat with.");
      return;
    }
    if (!text.trim() && !imagePreview && !fileInputRef.current.value) {
      toast.error("Please enter a message or select an image.");
      return;
    }
    // Tạo tin nhắn mới
    const newMessage = {
      id: Date.now(), // ID duy nhất cho tin nhắn
      text: text.trim(), // Nội dung tin nhắn
      sender: currentUser.id, // Người gửi tin nhắn
      receiver: selectedUser, // Người nhận tin nhắn
      timestamp: new Date().toISOString(), // Thời gian gửi tin nhắn
      isRead: false, // Mặc định tin nhắn chưa đọc
      image: imagePreview || null, // Hình ảnh (nếu có)
    };
    dispatch(addMessage(newMessage));
    try {
      fileInputRef.current.value = "";
      setText("");
      setImagePreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const addEmoji = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  return (
    <div className="relative pb-[26px] w-full">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-14 left-4 z-50 shadow-lg">
          <EmojiPicker onEmojiClick={(emojiObject) => addEmoji(emojiObject)} />
        </div>
      )}
      <div className="flex gap-2 mb-2 font-medium text-xs">
        <button className="px-4 py-1 rounded-full bg-white text-gray-600 shadow-md border border-gray-200 hover:bg-gray-100 transition">
          REQUEST VISIT
        </button>
        <button className="px-4 py-1 rounded-full bg-white text-gray-600 shadow-md border border-gray-200 hover:bg-gray-100 transition">
          MAKE OFFER
        </button>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="flex items-center gap-2 mb-2">
          <div className="relative w-20 h-20">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border border-gray-300"
            />
            <button
              onClick={removeImg}
              className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 p-1 rounded-full shadow-md">
              <i className="fa-solid fa-x text-base"></i>
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form
        onSubmit={handleSendMsg}
        className="flex items-center bg-white rounded-md shadow-md px-3 py-[10px] relative">
        {/* Nút mở Emoji Picker */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-gray-400 hover:text-gray-500 text-3xl">
          <i className="fa-regular fa-face-smile-beam"></i>
        </button>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-transparent outline-none px-3 text-gray-700 placeholder-gray-400 text-sm font-medium"
        />

        {/* File Input (Hidden) */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImgChange}
        />

        {/* Attach Image Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-gray-500 text-base">
          <i className="fa-solid fa-paperclip"></i>
        </button>

        {/* Send Button */}
        <button
          type="submit"
          className={`ml-2 flex items-center justify-center w-9 h-9 rounded-full 
    bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-xl 
    hover:shadow-2xl transform transition-all duration-300 ease-in-out 
    ${!text.trim() && !imagePreview ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!text.trim() && !imagePreview}>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
