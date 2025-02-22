import { useEffect, useState } from "react";
import "./CardChat.css";
import {
  selectMessages,
  updateIsReadMessage,
} from "../../redux/Chats/chatSlice";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { selectCurrentUser } from "../../redux/user/userSlice";

const CardChat = ({ user, onSelectUser }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const allMessages = useSelector(selectMessages);

  const [messages, setMessages] = useState(allMessages);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedMessages =
        JSON.parse(localStorage.getItem("chatMessages")) || [];
      setMessages(updatedMessages);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleMouseEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ top: rect.top, left: rect.left });
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // Lọc các tin nhắn giữa currentUser và user này
  const messageOfUser = messages.filter(
    (msg) =>
      (msg.sender === user?.id && msg.receiver === currentUser?.id) ||
      (msg.sender === currentUser?.id && msg.receiver === user?.id)
  );
  // Cập nhật tin nhắn của người dùng khi click vào card chat
  const handleClick = () => {
    onSelectUser(user?.id); // Gọi hàm onSelectUser khi nhấn vào card
    dispatch(updateIsReadMessage({ receiver: user?.id })); // Cập nhật tin nhăn
  };
  return (
    <div
      className={`w-[98%] card-chat shadow-md flex items-center bg-white py-3 px-3 rounded-md justify-between mb-[6px] cursor-pointer
      transition-transform duration-500 ${
        isHovered ? "fixed scale-125 shadow-lg" : ""
      }`}
      style={
        isHovered
          ? {
              top: position.top,
              left: position.left,
              width: "410px",
              zIndex: 50,
            }
          : {}
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}>
      <div className="flex items-center gap-[11px]">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                user?.avatar ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="avatar"
            />
          </div>
          {/* Status */}
          {user?.status === "Online" ? <div className="status"></div> : null}
        </div>
        {/* Chat content */}
        <div>
          <h6 className="font-bold text-sm">{user?.name}</h6>
          <p className="text-custom-gray-blue text-xs font-medium">
            {messageOfUser?.length > 0
              ? messageOfUser[messageOfUser.length - 1]?.text
              : "Start a conversation"}
          </p>
        </div>
      </div>
      <div className="flex items-end flex-col gap-2">
        <p className="text-xs text-gray-400 font-medium">
          {messageOfUser?.length > 0
            ? moment(messageOfUser[messageOfUser.length - 1]?.timestamp).format(
                "hh:mm"
              )
            : "Now"}
        </p>
        <div className="w-[16px] h-[16px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center leading-none">
          {messageOfUser.filter((msg) => msg.isRead === false).length}
        </div>
      </div>
    </div>
  );
};

export default CardChat;
