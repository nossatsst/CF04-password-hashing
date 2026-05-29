# Ethics and Safe Use Commitment - CF04

**Đề tài:** Password Hashing & Weak Password  
**Nhóm:** [Tên nhóm]  
**Mã học phần:** FIT4012 - Nhập môn An toàn bảo mật thông tin  
**Ngày nộp:** 2026-04-28

---

## 1. Cam kết chung

Nhóm chúng tôi, thực hiện đề tài **CF04 - Password Hashing & Weak Password**, xin cam kết tuân thủ nghiêm ngặt các quy định về đạo đức và an toàn thông tin trong suốt quá trình thực hiện demo.

---

## 2. Những điều CHÚNG TÔI KHÔNG làm

| STT | Hành vi bị cấm | Cam kết |
|-----|----------------|---------|
| 1 | Tấn công website, server, tài khoản, camera, router hoặc hệ thống thật | ✅ **KHÔNG thực hiện** |
| 2 | Gửi email phishing thật cho người khác | ✅ **KHÔNG thực hiện** |
| 3 | Dùng API key, mật khẩu, token hoặc dữ liệu cá nhân thật | ✅ **KHÔNG thực hiện** |
| 4 | Chạy công cụ brute-force, DDoS, quét cổng ngoài môi trường lab | ✅ **KHÔNG thực hiện** |
| 5 | Phát tán mã độc, webshell, ransomware hoặc script gây hại | ✅ **KHÔNG thực hiện** |
| 6 | Công khai thông tin nhạy cảm của cá nhân, lớp học, nhà trường | ✅ **KHÔNG thực hiện** |

---

## 3. Những điều CHÚNG TÔI THỰC HIỆN

| STT | Hành vi được phép | Cam kết thực hiện |
|-----|-------------------|-------------------|
| 1 | Demo trên máy cá nhân, môi trường local | ✅ **Đã thực hiện** |
| 2 | Dùng dữ liệu giả lập (alice, bob, admin) | ✅ **Đã thực hiện** |
| 3 | Dùng payload minh họa đơn giản trong môi trường lab | ✅ **Đã thực hiện** |
| 4 | Mô phỏng rủi ro bằng trang HTML cảnh báo | ✅ **Đã thực hiện** |

---

## 4. Phạm vi demo cụ thể

### 4.1 Môi trường chạy demo

```yaml
Hệ điều hành: Windows 10/11 (MINGW64 / Git Bash)
Trình duyệt: Chrome / Edge / Firefox
Kết nối mạng: Có thể có (chỉ để tải thư viện CryptoJS CDN), không gửi dữ liệu đi
Server: KHÔNG dùng server, chạy local file:// protocol
Database: KHÔNG dùng database thật, dùng localStorage của trình duyệt
