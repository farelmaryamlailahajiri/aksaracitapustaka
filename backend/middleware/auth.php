<?php
header('Content-Type: application/json');

// Pastikan jalur ini benar relatif ke file middleware
require __DIR__ . '/../config/database.php';

// Ambil token dari header X-Auth-Token
$headers = getallheaders();

$token = $headers['X-Auth-Token'] ?? $headers['x-auth-token'] ?? ''; 

if (!$token) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Token tidak ada. Silahkan login kembali.']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT admin_id FROM admin_sessions WHERE token = ? AND expires_at > NOW()");
    $stmt->execute([$token]);
    $session = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$session) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Token tidak valid atau kadaluarsa.']);
        exit();
    }

    $current_admin_id = $session['admin_id'];

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error pada otentikasi.']);
    exit();
}
// Skrip akan terus berjalan ke Controller/Endpoint yang me-require file ini
?>