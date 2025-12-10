<?php

header('Content-Type: application/json');

// === TAMBAHKAN CORS UNTUK POST + FILE ===
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: X-Auth-Token, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// === INI YANG WAJIB (sama persis seperti buku) ===
require_once __DIR__ . '/../../config/database.php';     // $pdo dari sini
require_once __DIR__ . '/../../includes/functions.php';  // upload_file() dan delete_file()

// TAMBAHKAN INI — INI YANG SELAMA INI HILANG!!!
require_once __DIR__ . '/../../middleware/auth.php';     // Ini yang bikin $pdo pasti ada + cek login

if (!function_exists('null_if_empty')) {
    function null_if_empty($value) {
        $trimmed = trim($value ?? '');
        return $trimmed === '' ? null : $trimmed;
    }
}

$uploadImage = null;
$errorUpload = false;
$errorMessage = '';

// Upload gambar ke folder "articles"
if (isset($_FILES['foto_buku']) && $_FILES['foto_buku']['error'] === 0) {
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $uploadImage = upload_file($_FILES['foto_buku'], 'articles', $allowed);

    if ($uploadImage === false) {
        $errorUpload = true;
        $errorMessage = 'Format gambar tidak didukung atau gagal upload.';
    }
}

if ($errorUpload) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $errorMessage]);
    exit;
}

// Ambil data
$nama_buku    = $_POST['nama_buku'] ?? '';
$nama_penulis = $_POST['nama_penulis'] ?? '';
$isi_articles = null_if_empty($_POST['isi_articles']);

// Validasi
if (empty($nama_buku) || empty($nama_penulis)) {
    if ($uploadImage) delete_file($uploadImage, 'articles');
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Judul dan penulis wajib diisi']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO articles (nama_buku, nama_penulis, isi_articles, foto_buku) VALUES (?, ?, ?, ?)");
    
    $stmt->execute([
        $nama_buku,
        $nama_penulis,
        $isi_articles,
        $uploadImage
    ]);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Artikel berhasil ditambahkan!',
        'id' => $pdo->lastInsertId()
    ]);

} catch (Exception $e) {
    if ($uploadImage) delete_file($uploadImage, 'articles');
    
    // TAMPILKAN ERROR DETAIL (HANYA UNTUK DEBUG — HAPUS NANTI!)
    error_log("CREATE ARTICLE ERROR: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal insert: ' . $e->getMessage()  // ini akan kasih tahu error sebenarnya
    ]);
}
?>