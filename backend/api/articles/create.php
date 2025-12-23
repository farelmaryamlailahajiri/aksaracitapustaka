<?php

header('Content-Type: application/json; charset=utf-8');

// CORS
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

// Require file yang diperlukan
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

// Generate slug unik
function generateUniqueSlug($pdo, $title) {
    $slug = strtolower($title);
    $slug = preg_replace('/[^a-z0-9-]+/', '-', $slug);
    $slug = trim($slug, '-');
    $slug = $slug ?: 'artikel';

    $stmt = $pdo->prepare("SELECT id FROM articles WHERE slug = ? LIMIT 1");
    $stmt->execute([$slug]);

    if ($stmt->rowCount() === 0) {
        return $slug;
    }

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

// === PROSES UPLOAD FOTO ===
$uploadedImage = null;
$errorUpload = false;
$errorMessage = '';

if (isset($_FILES['foto_buku']) && $_FILES['foto_buku']['error'] === 0) {
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $uploadedImage = upload_file($_FILES['foto_buku'], 'articles', $allowed);

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
$nama_buku    = null_if_empty($_POST['nama_buku'] ?? '');
$nama_penulis = null_if_empty($_POST['nama_penulis'] ?? '');  // TAMBAHAN
$isi_articles = null_if_empty($_POST['isi_articles'] ?? '');

// Validasi wajib: judul dan penulis
if (empty($nama_buku) || empty($nama_penulis)) {
    if ($uploadedImage) delete_file($uploadedImage, 'articles');
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Judul artikel dan nama penulis wajib diisi'
    ]);
    exit;
}

try {
    // Generate slug unik dari judul
    $slug = generateUniqueSlug($pdo, $nama_buku);

    // INSERT dengan kolom nama_penulis
    $stmt = $pdo->prepare("
        INSERT INTO articles 
            (nama_buku, nama_penulis, slug, isi_articles, foto_buku, created_at) 
        VALUES 
            (?, ?, ?, ?, ?, NOW())
    ");

    $stmt->execute([
        $nama_buku,
        $nama_penulis,     // nilai penulis dimasukkan di sini
        $slug,
        $isi_articles,
        $uploadedImage
    ]);

    $newId = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Artikel berhasil ditambahkan!',
        'id'      => $newId,
        'slug'    => $slug,
        'url'     => '/article/' . $slug
    ]);

} catch (Exception $e) {
    // Hapus file jika insert gagal
    if ($uploadedImage) delete_file($uploadedImage, 'articles');

    // Log error (lihat di server log)
    error_log("CREATE ARTICLE ERROR: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal menyimpan artikel. Silakan coba lagi.'
    ]);
}
?>