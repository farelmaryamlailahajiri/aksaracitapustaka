<?php

header('Content-Type: application/json; charset=utf-8');

// CORS untuk POST + upload file
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

// Require yang diperlukan
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/functions.php';  // upload_file(), delete_file()
require_once __DIR__ . '/../../middleware/auth.php';     // otentikasi admin

// Fungsi bantu
if (!function_exists('null_if_empty')) {
    function null_if_empty($value) {
        $trimmed = trim($value ?? '');
        return $trimmed === '' ? null : $trimmed;
    }
}

// Fungsi generate slug yang aman dan unik
function generateUniqueSlug($pdo, $title) {
    // Bersihkan judul jadi slug dasar
    $slug = strtolower($title);
    $slug = preg_replace('/[^a-z0-9-]+/', '-', $slug); // ganti karakter aneh jadi -
    $slug = trim($slug, '-');
    $slug = $slug ?: 'artikel'; // fallback kalau judul kosong semua

    // Cek apakah slug sudah ada
    $stmt = $pdo->prepare("SELECT id FROM articles WHERE slug = ? LIMIT 1");
    $stmt->execute([$slug]);
    
    if ($stmt->rowCount() === 0) {
        return $slug; // unik, langsung pakai
    }

    // Kalau sudah ada, tambahkan angka di belakang
    $counter = 1;
    while (true) {
        $newSlug = $slug . '-' . $counter;
        $stmt->execute([$newSlug]);
        if ($stmt->rowCount() === 0) {
            return $newSlug;
        }
        $counter++;
    }
}

// === PROSES UPLOAD FOTO ARTIKEL ===
$uploadedImage = null;
$errorUpload = false;
$errorMessage = '';

if (isset($_FILES['foto_artikel']) && $_FILES['foto_artikel']['error'] === 0) {
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $uploadedImage = upload_file($_FILES['foto_artikel'], 'articles', $allowed);

    if ($uploadedImage === false) {
        $errorUpload = true;
        $errorMessage = 'Format gambar tidak didukung atau gagal upload.';
    }
}

if ($errorUpload) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $errorMessage]);
    exit;
}

// === AMBIL DATA DARI FORM ===
$judul        = null_if_empty($_POST['judul'] ?? '');
$isi_artikel  = null_if_empty($_POST['isi_artikel'] ?? '');

// Validasi wajib
if (empty($judul)) {
    if ($uploadedImage) delete_file($uploadedImage, 'articles');
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Judul artikel wajib diisi']);
    exit;
}

try {
    // Generate slug otomatis dari judul
    $slug = generateUniqueSlug($pdo, $judul);

    // Insert ke database
    $stmt = $pdo->prepare("
        INSERT INTO articles 
            (judul, slug, isi_artikel, foto_artikel, tanggal_publish, created_at, updated_at) 
        VALUES 
            (?, ?, ?, ?, NOW(), NOW(), NOW())
    ");

    $stmt->execute([
        $judul,
        $slug,
        $isi_artikel,
        $uploadedImage
    ]);

    $newId = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Artikel berhasil ditambahkan!',
        'id'      => $newId,
        'slug'    => $slug,
        'url'     => '/article/' . $slug  // bonus: langsung kasih URL publik
    ]);

} catch (Exception $e) {
    // Hapus file kalau gagal insert
    if ($uploadedImage) delete_file($uploadedImage, 'articles');

    // Log error (untuk admin lihat di server log)
    error_log("CREATE ARTICLE ERROR: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal menyimpan artikel: ' . $e->getMessage()  // hapus ini di production
    ]);
}
?>