# Threat Model - CF04 Password Hashing & Weak Password

**Đề tài:** Password Hashing & Weak Password  
**Nhóm:** [Tên nhóm]  
**Ngày:** 2026-04-28

---

## 1. Asset - Tài sản cần bảo vệ

| Asset | Mô tả | Mức độ quan trọng |
|-------|-------|-------------------|
| Tài khoản người dùng | Username và password của sinh viên, giảng viên | 🔴 Cực kỳ quan trọng |
| Dữ liệu cá nhân | Email, số điện thoại, điểm số, thông tin liên lạc | 🔴 Cực kỳ quan trọng |
| Database users | Toàn bộ cơ sở dữ liệu chứa thông tin đăng nhập | 🔴 Cực kỳ quan trọng |
| Hệ thống backend | Server xử lý đăng nhập, xác thực người dùng | 🟠 Rất quan trọng |
| Tính sẵn sàng | Hệ thống hoạt động 24/7, không bị gián đoạn | 🟡 Quan trọng |

---

## 2. Threat - Mối đe dọa

| Threat | Mô tả | Nguồn gốc | Mức độ |
|--------|-------|-----------|--------|
| Tấn công database | Hacker đột nhập database qua SQL Injection, lỗ hổng bảo mật | Bên ngoài | 🔴 Cao |
| Insider threat | Nhân viên hoặc người có quyền truy cập đọc trộm dữ liệu | Nội bộ | 🟠 Trung bình |
| Brute-force attack | Tự động thử hàng triệu mật khẩu để đoán đúng | Bot/script | 🔴 Cao |
| Rainbow table attack | Dùng bảng màu để giải mã hash (nếu không có salt) | Bên ngoài | 🟠 Trung bình |
| Credential stuffing | Dùng mật khẩu bị lộ từ nơi khác để đăng nhập | Bên ngoài | 🔴 Cao |
| Social engineering | Lừa người dùng cung cấp mật khẩu | Bên ngoài | 🟡 Thấp |

---

## 3. Vulnerability - Lỗ hổng

### Lỗ hổng 1: Lưu mật khẩu dạng Plain Text
- **Mô tả:** Mật khẩu được lưu trong database dưới dạng chữ rõ, không qua xử lý
- **Điều kiện xảy ra:** Lập trình viên thiếu hiểu biết về bảo mật, hoặc hệ thống cũ
- **Cách khai thác:** Hacker chỉ cần đọc database là thấy mật khẩu

### Lỗ hổng 2: Không sử dụng Salt
- **Mô tả:** Hash mật khẩu nhưng không thêm salt, dẫn đến cùng mật khẩu có cùng hash
- **Điều kiện xảy ra:** Dùng MD5 hoặc SHA mà không thêm salt
- **Cách khai thác:** Dùng rainbow table để giải mã hash

### Lỗ hổng 3: Cho phép mật khẩu yếu
- **Mô tả:** Cho phép người dùng đặt mật khẩu như "123456", "password"
- **Điều kiện xảy ra:** Không có chính sách kiểm tra độ mạnh mật khẩu
- **Cách khai thác:** Brute-force dễ dàng, thời gian < 1 giây

### Lỗ hổng 4: Không giới hạn số lần đăng nhập sai
- **Mô tả:** Cho phép thử mật khẩu không giới hạn số lần
- **Điều kiện xảy ra:** Thiếu rate limit, không có lockout
- **Cách khai thác:** Brute-force tự động hàng triệu lần

---

## 4. Impact - Tác động

| Tác động | Mô tả | Mức độ |
|----------|-------|--------|
| Mất bí mật dữ liệu | 100% mật khẩu người dùng bị lộ nếu database bị tấn công | 🔴 Nghiêm trọng |
| Chiếm quyền tài khoản | Hacker đăng nhập vào tài khoản nạn nhân (account takeover) | 🔴 Nghiêm trọng |
| Tấn công dây chuyền | Dùng mật khẩu bị lộ để tấn công các hệ thống khác (credential stuffing) | 🔴 Nghiêm trọng |
| Mất uy tín | Tổ chức mất niềm tin từ khách hàng, đối tác | 🟠 Nặng |
| Kiện tụng pháp lý | Vi phạm các quy định bảo vệ dữ liệu (GDPR, PDPD) | 🟠 Nặng |
| Thiệt hại tài chính | Chi phí khắc phục, bồi thường, mất doanh thu | 🟠 Nặng |

**Số liệu thực tế:**
- LinkedIn 2012: 117 triệu mật khẩu bị lộ → thiệt hại ~5 triệu USD
- Facebook 2019: 540 triệu record bị lộ → phạt 5 tỷ USD

---

## 5. Mitigation - Biện pháp giảm thiểu

### 5.1 Biện pháp kỹ thuật

| STT | Biện pháp | Mô tả | Mức độ ưu tiên |
|-----|-----------|-------|----------------|
| 1 | **Hash + Salt** | Dùng bcrypt/argon2, luôn thêm salt | 🔴 Bắt buộc |
| 2 | **Rate limit** | Sai 5 lần → khóa 15 phút | 🟠 Cao |
| 3 | **MFA** | Xác thực 2 lớp bằng OTP, SMS, app | 🟠 Cao |
| 4 | **Chính sách mật khẩu mạnh** | ≥8 ký tự, hoa/thường/số/đặc biệt | 🟠 Cao |
| 5 | **Chặn mật khẩu phổ biến** | Không cho dùng "123456", "password" | 🟡 Trung bình |
| 6 | **Theo dõi đăng nhập lạ** | Cảnh báo khi đăng nhập từ IP mới | 🟡 Trung bình |

### 5.2 Biện pháp quy trình

| STT | Biện pháp | Mô tả |
|-----|-----------|-------|
| 1 | Review code | Kiểm tra không có hardcode secret |
| 2 | Đào tạo nhân viên | Tập huấn an toàn thông tin định kỳ |
| 3 | Incident response plan | Quy trình xử lý khi bị tấn công |
| 4 | Regular security audit | Kiểm tra bảo mật định kỳ |

### 5.3 Biện pháp nâng cao nhận thức

| STT | Biện pháp | Đối tượng |
|-----|-----------|-----------|
| 1 | Tập huấn phát hiện phishing | Người dùng cuối |
| 2 | Hướng dẫn dùng Password Manager | Người dùng cuối |
| 3 | Chiến dịch "Đổi mật khẩu định kỳ" | Người dùng cuối |
| 4 | Cảnh báo mật khẩu yếu khi đăng nhập | Người dùng cuối |

---

## 6. Kết luận

**Tóm tắt rủi ro:** Lưu mật khẩu plain text + mật khẩu yếu + không rate limit = mất an toàn hoàn toàn.

**Ưu tiên xử lý:**
1. ✅ Chuyển từ plain text sang bcrypt + salt
2. ✅ Thêm rate limit (5 lần sai → khóa)
3. ✅ Bật MFA cho tài khoản quan trọng
4. ✅ Áp dụng chính sách mật khẩu mạnh

**Người thực hiện:** [Tên nhóm]  
**Ngày cập nhật:** 2026-04-28
