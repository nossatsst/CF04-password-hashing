// ========== FAKE DATABASE ==========
let plainDB = JSON.parse(localStorage.getItem('plainDB')) || [
    { username: 'alice', password: 'iloveyou' },
    { username: 'bob', password: '123456' },
    { username: 'admin', password: 'admin123' }
];

let hashDB = JSON.parse(localStorage.getItem('hashDB')) || [
    { username: 'alice', passwordHash: hashPassword('iloveyou') },
    { username: 'bob', passwordHash: hashPassword('123456') },
    { username: 'admin', passwordHash: hashPassword('admin123') }
];

function hashPassword(password) {
    const salt = Math.random().toString(36).substring(2, 10);
    const hash = CryptoJS.SHA256(password + salt).toString();
    return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
    const [salt, originalHash] = storedHash.split(':');
    const testHash = CryptoJS.SHA256(password + salt).toString();
    return testHash === originalHash;
}

// ========== PLAIN TEXT ==========
function savePlainText() {
    const username = document.getElementById('plain-username').value;
    const password = document.getElementById('plain-password').value;
    
    if (!username || !password) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    
    plainDB.push({ username, password });
    localStorage.setItem('plainDB', JSON.stringify(plainDB));
    showPlainDatabase();
    document.getElementById('plain-password').value = '';
    showModal('⚠️ BẢN LỖI', `Đã lưu mật khẩu <strong style="color:#dc3545">"${password}"</strong> dạng PLAIN TEXT!`);
}

function showPlainDatabase() {
    const container = document.getElementById('plain-database');
    if (plainDB.length === 0) {
        container.innerHTML = '<em>Chưa có dữ liệu</em>';
        return;
    }
    
    let html = '<table><tr><th>Username</th><th>Password (PLAIN TEXT!)</th></tr>';
    plainDB.forEach(user => {
        html += `<tr><td>${user.username}</td><td style="color:#dc3545; font-weight:bold;">${user.password}</td></tr>`;
    });
    html += '</table>';
    container.innerHTML = html;
}

function loginPlain() {
    const username = document.getElementById('login-plain-user').value;
    const password = document.getElementById('login-plain-pass').value;
    const resultDiv = document.getElementById('login-plain-result');
    
    const user = plainDB.find(u => u.username === username && u.password === password);
    
    if (user) {
        resultDiv.innerHTML = '<div class="success">✅ Đăng nhập thành công!</div>';
    } else {
        resultDiv.innerHTML = '<div class="error">❌ Sai tên đăng nhập hoặc mật khẩu!</div>';
    }
}

// ========== HASH ==========
function saveHash() {
    const username = document.getElementById('hash-username').value;
    const password = document.getElementById('hash-password').value;
    
    if (!username || !password) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    
    const passwordHash = hashPassword(password);
    hashDB.push({ username, passwordHash });
    localStorage.setItem('hashDB', JSON.stringify(hashDB));
    showHashDatabase();
    document.getElementById('hash-password').value = '';
    showModal('✅ BẢN AN TOÀN', `Mật khẩu đã được HASH + SALT: <code style="font-size:10px">${passwordHash.substring(0, 40)}...</code>`);
}

function showHashDatabase() {
    const container = document.getElementById('hash-database');
    if (hashDB.length === 0) {
        container.innerHTML = '<em>Chưa có dữ liệu</em>';
        return;
    }
    
    let html = '<table><tr><th>Username</th><th>Password Hash (Đã mã hóa)</th></tr>';
    hashDB.forEach(user => {
        html += `<tr><td>${user.username}</td><td style="font-size:11px; color:#2e7d32;">${user.passwordHash.substring(0, 40)}...</td></tr>`;
    });
    html += '</table>';
    container.innerHTML = html;
}

function loginHash() {
    const username = document.getElementById('login-hash-user').value;
    const password = document.getElementById('login-hash-pass').value;
    const resultDiv = document.getElementById('login-hash-result');
    
    const user = hashDB.find(u => u.username === username);
    
    if (user && verifyPassword(password, user.passwordHash)) {
        resultDiv.innerHTML = '<div class="success">✅ Đăng nhập thành công! (Xác thực an toàn)</div>';
    } else {
        resultDiv.innerHTML = '<div class="error">❌ Sai tên đăng nhập hoặc mật khẩu!</div>';
    }
}

// ========== WEAK PASSWORD ==========
const weakPasswords = ['123456', 'password', '12345678', 'qwerty', 'abc123', 'admin123', 'iloveyou', 'welcome'];

function checkPasswordStrength() {
    const password = document.getElementById('weakpass-input').value;
    const meter = document.getElementById('strength-meter');
    const textDiv = document.getElementById('strength-text');
    
    if (!password) {
        meter.innerHTML = '';
        textDiv.innerHTML = '';
        return;
    }
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (weakPasswords.includes(password.toLowerCase())) score = 0;
    
    const percent = (score / 5) * 100;
    let color, message;
    
    if (score === 0) { color = '#dc3545'; message = '⚠️ RẤT YẾU - Mật khẩu phổ biến!'; }
    else if (score <= 2) { color = '#dc3545'; message = '⚠️ YẾU - Cần cải thiện'; }
    else if (score <= 3) { color = '#ffc107'; message = '👍 TRUNG BÌNH'; }
    else if (score <= 4) { color = '#28a745'; message = '✅ MẠNH - Tốt!'; }
    else { color = '#20c997'; message = '🌟🌟 RẤT MẠNH - Xuất sắc!'; }
    
    meter.innerHTML = `<div class="fill" style="width:${percent}%; background:${color};"></div>`;
    textDiv.innerHTML = `<strong>Độ mạnh:</strong> ${message}`;
}

function testWeakPassword() {
    let html = '<div style="margin-top:15px;"><strong>📋 Mật khẩu phổ biến (KHÔNG BAO GIỜ DÙNG):</strong><ul>';
    weakPasswords.forEach(pw => {
        html += `<li><code>${pw}</code> - Brute-force &lt;1 giây</li>`;
    });
    html += '</ul><div class="warning">⚠️ 83% người dùng dùng mật khẩu trong top 100!</div></div>';
    document.getElementById('weak-results').innerHTML = html;
}

// ========== HASH DEMO ==========
function demoHash() {
    const input = document.getElementById('input-text').value;
    document.getElementById('plain-demo').innerHTML = input || '---';
    
    if (input) {
        const sha256 = CryptoJS.SHA256(input).toString();
        document.getElementById('sha256-demo').innerHTML = sha256;
        
        const salt = Math.random().toString(36).substring(2, 10);
        const bcryptSim = CryptoJS.SHA256(input + salt).toString();
        document.getElementById('bcrypt-demo').innerHTML = `${salt.substring(0,6)}...:${bcryptSim.substring(0, 35)}...`;
    } else {
        document.getElementById('sha256-demo').innerHTML = '---';
        document.getElementById('bcrypt-demo').innerHTML = '---';
    }
}

// ========== MODAL GIẢI THÍCH QUY TRÌNH ==========
function showStep(type) {
    const modal = document.getElementById('stepModal');
    const modalBody = document.getElementById('modal-body');
    
    if (type === 'plain') {
        modalBody.innerHTML = `
            <h3>🔓 Quy trình xác thực - Bản lỗi (Plain Text)</h3>
            <ol style="margin-top:15px; margin-left:20px; line-height:1.8;">
                <li>Lấy <strong>username</strong> và <strong>password</strong> từ form</li>
                <li>Tạo câu lệnh SQL: <code>SELECT * FROM users WHERE username='xxx' AND password='xxx'</code></li>
                <li>So sánh <strong>trực tiếp</strong> mật khẩu nhập với mật khẩu trong DB</li>
                <li style="color:#dc3545; font-weight:bold;">⚠️ Nếu có kết quả → Đăng nhập thành công</li>
            </ol>
            <div class="warning" style="margin-top:15px;">
                <strong>Vấn đề:</strong> Mật khẩu được lưu và so sánh dạng CHỮ RÕ!
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <h3>🔒 Quy trình xác thực - Bản an toàn (Hash + Salt)</h3>
            <ol style="margin-top:15px; margin-left:20px; line-height:1.8;">
                <li>Lấy <strong>username</strong> và <strong>password</strong> từ form</li>
                <li>Tìm user trong database theo username</li>
                <li>Lấy <strong>salt + hash</strong> đã lưu của user đó</li>
                <li>Hash lại password nhập vào với salt cũ: <code>hash_moi = SHA256(password + salt)</code></li>
                <li>So sánh <strong>hash_moi</strong> với <strong>hash_da_luu</strong></li>
                <li style="color:#28a745; font-weight:bold;">✅ Nếu bằng nhau → Đăng nhập thành công</li>
            </ol>
            <div class="success" style="margin-top:15px;">
                <strong>Lợi ích:</strong> Không bao giờ lưu hoặc so sánh mật khẩu gốc!
            </div>
        `;
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('stepModal').style.display = 'none';
}

// ========== RESET ==========
function resetAllData() {
    if (confirm('⚠️ Reset toàn bộ dữ liệu demo?')) {
        localStorage.clear();
        plainDB = [
            { username: 'alice', password: 'iloveyou' },
            { username: 'bob', password: '123456' },
            { username: 'admin', password: 'admin123' }
        ];
        hashDB = [
            { username: 'alice', passwordHash: hashPassword('iloveyou') },
            { username: 'bob', passwordHash: hashPassword('123456') },
            { username: 'admin', passwordHash: hashPassword('admin123') }
        ];
        localStorage.setItem('plainDB', JSON.stringify(plainDB));
        localStorage.setItem('hashDB', JSON.stringify(hashDB));
        
        showPlainDatabase();
        showHashDatabase();
        alert('✅ Reset thành công!');
    }
}

// ========== KHỞI TẠO ==========
window.onload = () => {
    showPlainDatabase();
    showHashDatabase();
    demoHash();
    
    // Khởi tạo strength meter
    const meter = document.getElementById('strength-meter');
    meter.innerHTML = '<div class="fill"></div>';
    
    // Đóng modal khi click ra ngoài
    window.onclick = (event) => {
        const modal = document.getElementById('stepModal');
        if (event.target === modal) modal.style.display = 'none';
    };
};