import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUsers,
  switchUser,
} from "../../redux/user/userSlice";

const UserSwitcher = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);

  const handleSwitchUser = (user) => {
    if (user.id !== currentUser.id) {
      dispatch(switchUser(user)); // Dispatch action to switch the current user
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-96 mx-auto max-h-[400px] overflow-y-auto">
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id}>
            <button
              onClick={() => handleSwitchUser(user)}
              disabled={user.id === currentUser.id}
              className={`w-full text-left px-6 py-3 rounded-lg transition-all duration-300 ease-in-out 
                ${
                  user.id === currentUser.id
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-60"
                    : "bg-gradient-to-r from-teal-400 to-teal-500 text-white hover:from-teal-500 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                } shadow-md hover:shadow-lg`}
              role="button"
              aria-label={`Switch to ${user.name}`}>
              {/* Icon or initials */}
              <span className="inline-block mr-4 w-10 h-10 rounded-full bg-gray-300 text-center text-lg font-bold text-gray-800">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.name[0].toUpperCase()
                )}
              </span>
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">{user.name}</span>
                {/* Status */}
                <span
                  className={`text-sm font-semibold ${
                    user.status === "Online"
                      ? "text-green-700" // Tăng độ đậm của xanh lá
                      : user.status === "Away"
                      ? "text-yellow-600" // Tăng độ đậm của vàng
                      : "text-gray-700" // Giữ xám nhẹ cho trạng thái khác
                  }`}>
                  {user.status}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSwitcher;
