<?php
// frontend/public/api/auth/login.php
header('Content-Type: application/json');

require '../../config/database.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Baca data JSON dari input stream (INI SUDAH BENAR)
$input = file_get_contents("php://input");
$data = json_decode($input, true); 

$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Username dan password wajib diisi']);
    exit;
}

try {
    // 1. Cari pengguna di database
    $stmt = $pdo->prepare("SELECT id, username, password FROM admin WHERE username = ? LIMIT 1");
    $stmt->execute([$username]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. Verifikasi password
    if ($admin && password_verify($password, $admin['password'])) {
        $token = bin2hex(random_bytes(32)); 
        $admin_id = $admin['id'];
        
        // Atur masa kedaluwarsa token (misal: 7 hari)
        $expires_at = date('Y-m-d H:i:s', time() + (7 * 24 * 60 * 60)); 

        // 3. Simpan token ke database (di tabel 'admin_sessions')
        // Pastikan tabel admin_sessions memiliki kolom: id, admin_id, token, expires_at, created_at
        $stmt = $pdo->prepare("INSERT INTO admin_sessions (admin_id, token, expires_at) VALUES (?, ?, ?)");
        $stmt->execute([$admin_id, $token, $expires_at]);

        // 4. Hapus token lama/kedaluwarsa untuk menjaga kebersihan database (Optional)
        $stmt = $pdo->prepare("DELETE FROM admin_sessions WHERE admin_id = ? AND expires_at < NOW()");
        $stmt->execute([$admin_id]);

        echo json_encode([
            'success' => true,
            'token' => $token,
            'message' => 'Login berhasil'
        ]);
        
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Username atau password salah']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Terjadi kesalahan server saat login.']);
    // Untuk debugging: echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>