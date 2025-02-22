import { useSelector } from "react-redux";
import CardChat from "../../components/CardChat/CardChat";
import { selectCurrentUser, selectUsers } from "../../redux/user/userSlice";
import { useMemo, useState } from "react";

const SideBarChat = ({ onSelectUser }) => {
  const listUser = useSelector(selectUsers);
  const currentUser = useSelector(selectCurrentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = useMemo(
    () =>
      listUser.filter(
        (user) =>
          user.id !== currentUser.id &&
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [listUser, currentUser.id, searchTerm]
  );
  return (
    <div className="w-2/5 flex items-start flex-col gap-3 pl-10">
      {/* Search */}
      <div className="w-full">
        <label className="input flex items-center gap-2 bg-custom-bg-chat p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#9B9CA2"
            className="h-6 w-6 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <div className="divider m-0"></div>
      </div>
      {/* Chat List */}
      <div
        className="h-[calc(100vh-180px)] overflow-y-auto overflow-x-hidden w-full flex items-start flex-col gap-[10px] 
          "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#9B9CA2 #F3F4F6",
          backfaceVisibility: "hidden",
        }}>
        {filteredUsers.map((user) => (
          <CardChat key={user.id} user={user} onSelectUser={onSelectUser} />
        ))}
        {filteredUsers.length === 0 && (
          <p className="text-gray-500 text-center p-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default SideBarChat;
