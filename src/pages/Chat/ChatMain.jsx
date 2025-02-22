import moment from "moment";
import SideBarChat from "./SideBarChat";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";
import { selectMessages, setMessages } from "../../redux/Chats/chatSlice";
import { useEffect, useState } from "react";
import { selectCurrentUser, selectUsers } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const ChatMain = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentMessages = useSelector(selectMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedMessages =
        JSON.parse(localStorage.getItem("chatMessages")) || [];

      dispatch(setMessages(updatedMessages)); // Dispatch action để cập nhật Redux store
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);
  // Lọc tin nhắn giữa người dùng hiện tại và người được chọn
  const filteredMessages = currentMessages.filter(
    (msg) =>
      (msg.sender === currentUser?.id && msg.receiver === selectedUser) ||
      (msg.sender === selectedUser && msg.receiver === currentUser?.id)
  );
  //tìm name của người được chọn
  const selectedUserInFo = useSelector(selectUsers).find(
    (user) => user.id === selectedUser
  );
  return (
    <div className="pl-14 mt-4 pr-12">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between px-6 pt-4 pb-[14px]">
          <div>
            <h4 className="text-3xl font-medium">Chat</h4>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 pr-7">
              <p className="font-normal">Status: Sale</p>
              <div className="text-center pb-1">
                <i className="fa-solid fa-sort-down"></i>
              </div>
            </div>
            <div className="text-base text-gray-500">
              <i className="fa-regular fa-bell"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex items-start gap-6 h-[calc(100vh-115px)]">
        {/* Sidebar chat */}
        <SideBarChat onSelectUser={setSelectedUser} />

        {/* Chat container */}
        <div className="w-3/5 flex flex-col h-[100%]">
          {/* Chat header */}
          <div>
            <h6 className="font-bold">Gold Coast</h6>
            <p className="text-xs font-medium text-gray-500 mb-[11px]">
              From: {selectedUserInFo?.name || "Unknown"}
            </p>
            <div className="divider m-0"></div>
          </div>

          {/* Chat content */}
          <div className="flex flex-col flex-1 justify-between h-[calc(100%-48px)]">
            {/* Chat messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#9B9CA2 #F3F4F6",
              }}>
              {filteredMessages.map((message) => {
                const isSender = message.sender === currentUser?.id; // Kiểm tra người gửi
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      isSender ? "justify-end" : "justify-start"
                    }`}>
                    {/* Hiển thị avatar và thời gian cho tin nhắn nhận */}
                    {!isSender && (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={selectedUserInFo?.avatar}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {moment(message.timestamp).format("hh:mm")}
                        </p>
                      </div>
                    )}
                    {/* Nội dung tin nhắn */}
                    <div
                      className={`flex flex-col ${
                        isSender ? "items-end" : "items-start"
                      }`}>
                      {message?.text ? (
                        <div
                          className={`px-4 py-[9px] rounded-full text-sm ${
                            isSender
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          } max-w-xs sm:max-w-md lg:max-w-lg break-words whitespace-pre-wrap`}>
                          {message.text}
                        </div>
                      ) : (
                        <div>
                          <img
                            src={message.image}
                            alt="image"
                            className="w-48 h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input message */}
            <MessageInput selectedUser={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
