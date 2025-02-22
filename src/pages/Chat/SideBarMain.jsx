import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/userSlice";
import UserSwitcher from "../../components/UserSwitch/UserSwitch";
import { useState } from "react";

const SideBarMain = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null); // Thêm state để theo dõi mục được chọn

  // Hàm xử lý khi click vào mục
  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };
  // Hàm mở modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-2/12 h-full bg-custom-light-blue flex flex-col relative">
      {/* content */}
      <div className="flex flex-col justify-center items-center my-10">
        {/* avatar */}
        <div className="avatar md:w-16 md:h-16 w-10 h-10">
          <div className="ring-white rounded-full ring ring-offset-2 w-full">
            <img
              src={currentUser?.avatar}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        {/* username */}
        <div className="text-center mt-3 flex items-center gap-2 text-custom-color-name">
          <h6 className="font-bold hidden md:block">{currentUser?.name}</h6>
          <button onClick={handleOpenModal}>
            <i className="fa-solid fa-angle-down"></i>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-4 text-custom-gray-blue font-bold w-full">
        {/* Sidebar items with hover effect and blue left border */}
        {[
          { icon: "fa-solid fa-house", text: "PROPERTIES" },
          { icon: "fa-regular fa-message", text: "CHAT" },
          { icon: "fa-regular fa-calendar", text: "CALENDAR" },
          { icon: "fa-solid fa-tag", text: "OFFERS" },
          { icon: "fa-regular fa-file-lines", text: "DOCUMENTS" },
          { icon: "fa-solid fa-gear", text: "SETTINGS" },
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(index)}
            className={`group flex items-center md:items-start gap-4 py-2 pl-2 md:pl-8 hover:text-blue-500 rounded-lg transition-colors relative w-full justify-center md:justify-start ${
              selectedIndex === index ? "text-blue-500" : ""
            }`}>
            <i className={`${item.icon} text-lg`}></i>
            <h5 className="text-xs tracking-wide hidden md:block">
              {item.text}
            </h5>
            <span
              className={`absolute left-0 top-0 h-full w-1 bg-blue-500  ${
                selectedIndex === index ? "block" : "group-hover:block hidden"
              }`}></span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={handleCloseModal}>
          <div
            className="modal-box w-full bg-white p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Ngăn modal đóng khi nhấn vào nội dung
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Switch User
            </h3>
            <UserSwitcher />
            <div className="modal-action mt-4">
              <button
                onClick={handleCloseModal}
                className="btn btn-outline btn-sm w-full">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBarMain;
