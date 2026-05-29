# 🔐 CF04 - Password Hashing & Weak Password

> **Cyber Fortress | FIT4012 - Nhập môn An toàn bảo mật thông tin**  
> *Demo trực quan về tầm quan trọng của việc bảo vệ mật khẩu trong hệ thống*

[![Demo Status](https://img.shields.io/badge/demo-ready-brightgreen)]()
[![License](https://img.shields.io/badge/license-educational-blue)]()
[![Browser](https://img.shields.io/badge/browser-Chrome%20%7C%20Edge%20%7C%20Firefox-orange)]()

---

## 📌 Tổng quan

Dự án này minh họa **sự khác biệt giữa lưu mật khẩu dạng plain text và hash an toàn (bcrypt)**, đồng thời trình bày các chính sách mật khẩu mạnh để phòng tránh tấn công.

### 🎯 Mục tiêu
- Hiểu vì sao **không bao giờ** lưu mật khẩu dạng plain text
- Biết cách **hash mật khẩu với salt** bằng bcrypt/Argon2
- Nhận diện **mật khẩu yếu** và hậu quả của chúng
- Áp dụng **checklist phòng thủ** trong thực tế

### 🖥️ Công nghệ sử dụng
| Công nghệ | Mục đích |
|-----------|----------|
| HTML5/CSS3 | Giao diện trực quan, responsive |
| JavaScript | Logic xử lý phía client |
| CryptoJS | Hàm hash MD5/SHA-256 (minh họa) |
| localStorage | Lưu trữ dữ liệu demo |

---

## 🚀 Cách chạy demo

### Yêu cầu
- Trình duyệt web (Chrome, Edge, Firefox, Safari)
- Không cần cài đặt thêm bất kỳ phần mềm nào

### Các bước thực hiện

```bash
# 1. Clone repository
git clone https://github.com/your-username/CF04-password-hashing.git

# 2. Di chuyển vào thư mục
cd CF04-password-hashing

# 3. Mở file index.html bằng trình duyệt
# Cách 1: Double-click vào file index.html
# Cách 2: Dùng lệnh (macOS/Linux)
open index.html
# Hoặc (Windows)
start index.html
Hướng dẫn demo
1. So sánh Plain Text vs Hash
Bước	Hành động	Kết quả mong đợi
1	Click "Xem Database" ở bản lỗi	Hiện mật khẩu dạng chữ rõ (ví dụ: 123456, iloveyou)
2	Click "Xem Database" ở bản an toàn	Hiện hash đã mã hóa, không thể đọc ngược
3	Đăng ký user mới ở bản lỗi	Mật khẩu được lưu plain text → NGUY HIỂM
4	Đăng ký user mới ở bản an toàn	Mật khẩu được hash + kiểm tra độ mạnh → AN TOÀN
2. Demo đăng nhập
javascript
// Tài khoản mẫu có sẵn
Plain Text DB:
- username: alice | password: iloveyou
- username: bob   | password: 123456
- username: admin | password: admin123

Hash DB:
- username: alice | password: iloveyou
- username: bob   | password: 123456
- username: admin | password: admin123
3. Kiểm tra độ mạnh mật khẩu
Hệ thống tự động đánh giá mật khẩu theo các tiêu chí:

✅ Độ dài ≥ 8 ký tự

✅ Có chữ hoa (A-Z)

✅ Có chữ thường (a-z)

✅ Có số (0-9)

✅ Có ký tự đặc biệt (!@#$%^&*)

❌ Không nằm trong danh sách mật khẩu yếu

4. Hiểu cách hash hoạt động
Nhập bất kỳ văn bản nào vào ô "Hash hoạt động như thế nào?" để thấy:

MD5: Output cố định (⚠️ KHÔNG an toàn cho mật khẩu)

SHA-256: Output cố định (an toàn hơn nhưng vẫn cần salt)

bcrypt: Output khác nhau mỗi lần nhờ SALT

🗂️ Cấu trúc thư mục
text
CF04-password-hashing/

├── demo/               # Bằng chứng demo
│   ├── index.html
│   ├── style.css
│   ├── script.js
├── README.md               # Tài liệu hướng dẫn (file này)
├── slides/                 # Slide thuyết trình
│   └── cyber-fortress-slides.pdf
├── evidence/               # Bằng chứng demo
│   ├── before-plaintext.png
│   ├── after-hash.png
│   ├── weak-password-test.png
│   └── demo-video.mp4
├── threat-model.md         # Phân tích mối đe dọa
└── ethics-safe-use.md      # Cam kết đạo đức an toàn
🛡️ Checklist phòng thủ
Dưới đây là các biện pháp bảo vệ mật khẩu được trình bày trong demo:

#	Biện pháp	Mức độ ưu tiên
1	KHÔNG bao giờ lưu mật khẩu dạng plain text	🔴 Cực kỳ cao
2	Dùng thư viện hash chuyên dụng (bcrypt, Argon2, PBKDF2)	🔴 Cực kỳ cao
3	Luôn thêm Salt vào mỗi mật khẩu trước khi hash	🔴 Cực kỳ cao
4	Áp dụng chính sách mật khẩu mạnh (≥8 ký tự, có chữ hoa, số, ký tự đặc biệt)	🟠 Cao
5	Chặn các mật khẩu phổ biến (123456, password, qwerty...)	🟠 Cao
6	Thêm Rate Limit (giới hạn số lần đăng nhập sai)	🟡 Trung bình
7	Bật MFA - Xác thực 2 lớp	🟡 Trung bình
8	Không tự viết thuật toán hash	🔴 Cực kỳ cao
📊 Kết quả demo
Trước khi áp dụng biện pháp phòng thủ
Metric	Giá trị
Mật khẩu bị lộ khi database bị đánh cắp	100%
Thời gian brute-force mật khẩu 123456	< 1 giây
Nguy cơ account takeover	Rất cao
Sau khi áp dụng biện pháp phòng thủ
Metric	Giá trị
Mật khẩu bị lộ khi database bị đánh cắp	0% (chỉ thấy hash)
Thời gian brute-force mật khẩu mạnh	~100 năm
Nguy cơ account takeover	Rất thấp
🎓 Bài học rút ra
Plain text = Thảm họa
Chỉ cần một lỗ hổng SQL Injection hoặc insider threat, toàn bộ mật khẩu người dùng bị lộ.

Hash không phải là đủ
Cần có salt để chống rainbow table attack, và cost factor để chống brute-force.

Mật khẩu yếu là lỗ hổng lớn nhất
Dùng bcrypt cũng vô ích nếu người dùng đặt mật khẩu là 123456 và không có rate limit.

Defense in depth
Kết hợp nhiều lớp: hash + salt + MFA + rate limit + chính sách mật khẩu mạnh.

📝 Tài khoản demo mặc định
yaml
Plain Text Database:
  - username: alice
    password: iloveyou
  - username: bob
    password: 123456
  - username: admin
    password: admin123

Hash Database (đã được bcrypt):
  - username: alice
    password: iloveyou
  - username: bob
    password: 123456
  - username: admin
    password: admin123
⚠️ Lưu ý: Đây chỉ là dữ liệu giả lập trong môi trường demo. Không sử dụng mật khẩu này trong thực tế.

🔒 Cam kết an toàn
Dự án này tuân thủ nghiêm ngặt các quy định đạo đức an toàn thông tin:

✅ Chạy hoàn toàn trên môi trường local (trình duyệt)

✅ Không gửi bất kỳ dữ liệu nào ra ngoài

✅ Không lưu trữ mật khẩu thật của người dùng

✅ Không kết nối đến bất kỳ server hay database thật nào

✅ Minh bạch về cơ chế hoạt động

Xem chi tiết tại: ethics-safe-use.md

📧 Liên hệ
Giảng viên hướng dẫn: ThS. Nguyễn Văn Nhân & ThS. Lê Thị Thùy Trang

Học phần: FIT4012 - Nhập môn An toàn bảo mật thông tin

Ngày: 2026-04-28

📚 Tham khảo
OWASP - Password Storage Cheat Sheet

bcrypt GitHub

Have I Been Pwned

NIST Digital Identity Guidelines

📄 License
Dự án này được tạo ra với mục đích giáo dục và nghiên cứu, thuộc khuôn khổ học phần FIT4012 - Đại học Công nghệ Thông tin.

© 2026 Cyber Fortress Team

<div align="center"> <sub>Built with ❤️ for Cyber Fortress - FIT4012</sub> </div> ```
📝 Ghi chú bổ sung
Các thành phần cần tạo thêm:
1. File ethics-safe-use.md (ngắn gọn):

markdown
# Ethics and Safe Use Commitment - CF04

**Nhóm:** [Tên nhóm]

## Cam kết

Chúng tôi cam kết:

1. ✅ Chỉ demo trên môi trường local (trình duyệt, không server)
2. ✅ Không lưu trữ hoặc thu thập mật khẩu thật của bất kỳ ai
3. ✅ Không kết nối đến database hoặc API thật ngoài phạm vi demo
4. ✅ Không sử dụng kỹ thuật hash để tấn công hệ thống thật
5. ✅ Dữ liệu user chỉ là giả lập (alice, bob, admin)
6. ✅ Minh bạch toàn bộ source code và cơ chế hoạt động
7. ✅ Tuân thủ quy định đạo đức của FIT4012

## Phạm vi sử dụng

- **Môi trường:** Local browser, không internet required
- **Mục đích:** Giáo dục, minh họa trong khuôn khổ Cyber Fortress
- **Đối tượng:** Giảng viên và sinh viên lớp FIT4012

**Thành viên:**
- Hồ Khăc Sơn
- Tạ Công Sơn
- Nguyễn Vũ Phương
- Đinh Dương Phong 

**Ngày:** 2026-04-28
2. File threat-model.md:
(Đã có trong hướng dẫn trước đó)

🚀 Deploy lên GitHub Pages (để demo trực tuyến)
bash
# 1. Tạo repository trên GitHub
# 2. Push code lên
git add .
git commit -m "Initial commit: CF04 Password Hashing Demo"
git push origin main

# 3. Vào Settings > Pages
# 4. Chọn branch: main, folder: / (root)
# 5. Save - đợi 1-2 phút
# 6. Truy cập: https://your-username.github.io/CF04-password-hashing