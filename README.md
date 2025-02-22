Tổng quan
Ứng dụng chat được xây dựng bằng React và Redux, hỗ trợ các tính năng:

Chat real-time giữa nhiều người dùng.

Chuyển đổi người dùng (User Switching).

Gửi tin nhắn văn bản, hình ảnh và emoji.

Tìm kiếm người dùng trong danh sách chat.

Lưu trữ tin nhắn bằng localStorage.

Các thành phần chính
Thành phần	  Chức năng
SideBarMain	  Hiển thị thông tin người dùng và menu chính (Properties, Chat, Calendar...)
SideBarChat   Danh sách người dùng và tính năng tìm kiếm
ChatMain	    Khu vực hiển thị tin nhắn và giao diện chat chính
MessageInput	Nhập và gửi tin nhắn (text/emoji/hình ảnh)
UserSwitcher	Modal chuyển đổi giữa các người dùng (nằm kế bên name user)
CardChat	    Hiển thị thông tin người dùng trong danh sách chat
Hướng dẫn sử dụng chi tiết
1. Đăng nhập & Chuyển đổi người dùng
Bước 1: Nhấn vào nút mũi tên (▼) bên cạnh tên người dùng trong SideBarMain.

Bước 2: Chọn người dùng từ danh sách trong modal UserSwitcher.

Lưu ý:

Người dùng hiện tại được đánh dấu màu xám và không thể chọn lại.

Trạng thái (Online/Offline/Away) hiển thị bên cạnh tên.

2. Bắt đầu chat
Bước 1: Trong SideBarChat, nhập tên người dùng vào ô Search để tìm kiếm.

Bước 2: Nhấn vào CardChat của người dùng muốn chat.

Kết quả:

Tin nhắn cũ hiển thị trong ChatMain.

Số tin nhắn chưa đọc hiển thị bằng badge đỏ.

3. Gửi tin nhắn
Gửi văn bản:

Nhập nội dung vào ô "Type a message...".

Nhấn nút Send (biểu tượng máy bay) hoặc phím Enter.

Gửi emoji:

Nhấn biểu tượng mặt cười (😊) để mở bảng emoji.

Chọn emoji để chèn vào tin nhắn.

Gửi hình ảnh:

Nhấn biểu tượng ghim giấy (📎) để chọn hình từ máy tính.

Xem preview hình ảnh trước khi gửi.

Nhấn nút Send để gửi.

4. Đọc tin nhắn
Tin nhắn từ người khác hiển thị bên trái với avatar và thời gian.

Tin nhắn của bạn hiển thị bên phải với nền xanh dương.

Tin nhắn hình ảnh hiển thị dưới dạng thumbnail.
