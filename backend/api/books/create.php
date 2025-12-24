<?php
// backend/api/books/create.php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: X-Auth-Token, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../config/database.php';
require '../../includes/functions.php';
require '../../middleware/auth.php'; // Otentikasi Admin

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Helper: Null jika string kosong
if (!function_exists('null_if_empty')) {
    function null_if_empty($value) {
        $trimmed = trim($value ?? '');
        return empty($trimmed) ? null : $trimmed;
    }
}

/**
 * Generate slug unik untuk tabel books
 */
function generateUniqueBookSlug($pdo, $title) {
    $slug = strtolower($title);
    $slug = preg_replace('/[^a-z0-9-]+/', '-', $slug);
    $slug = trim($slug, '-');
    $slug = $slug ?: 'buku';

    $stmt = $pdo->prepare("SELECT id FROM books WHERE slug = ? LIMIT 1");
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

$uploadCover = null;
$uploadPreview = null;
$errorUpload = false;
$errorMessage = '';

// 1. Upload Cover
if (isset($_FILES['foto_buku']) && $_FILES['foto_buku']['error'] === 0) {
    $allowedCover = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $uploadCover = upload_file($_FILES['foto_buku'], 'covers', $allowedCover);
    
    if ($uploadCover === false) {
        $errorUpload = true;
        $errorMessage = 'Format cover tidak didukung atau gagal upload cover.';
    }
}

// 2. Upload Preview PDF
if (!$errorUpload && isset($_FILES['preview_pdf']) && $_FILES['preview_pdf']['error'] === 0) {
    $allowedPreview = ['pdf'];
    $uploadPreview = upload_file($_FILES['preview_pdf'], 'previews', $allowedPreview);
    
    if ($uploadPreview === false) {
        $errorUpload = true;
        $errorMessage = 'File preview harus PDF atau gagal upload PDF.';
        if ($uploadCover) delete_file($uploadCover, 'covers');
    }
}

if ($errorUpload) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $errorMessage]);
    exit;
}

// 3. Ambil dan Siapkan Fields
$nama_buku = $_POST['nama_buku'] ?? '';
$nama_penulis = $_POST['nama_penulis'] ?? '';

$fields = [
    'nama_buku'        => $nama_buku,
    'nama_penulis'     => $nama_penulis,
    'nama_tata_letak'  => null_if_empty($_POST['nama_tata_letak']),
    'nama_editor'      => null_if_empty($_POST['nama_editor']),
    'isbn'             => null_if_empty($_POST['isbn']),
    'jumlah_halaman'   => empty($_POST['jumlah_halaman']) ? null : (int)$_POST['jumlah_halaman'], 
    'harga_buku'       => empty($_POST['harga_buku']) ? null : (int)$_POST['harga_buku'],
    'tahun_terbit'     => empty($_POST['tahun_terbit']) ? null : (int)$_POST['tahun_terbit'],
    'ukuran_buku'      => null_if_empty($_POST['ukuran_buku']),
    'deskripsi_buku'   => null_if_empty($_POST['deskripsi_buku']),
    'foto_buku'        => $uploadCover, 
    'preview_pdf'      => $uploadPreview, 
];

// Validasi Wajib
if (empty($fields['nama_buku']) || empty($fields['nama_penulis'])) {
    if ($uploadCover) delete_file($uploadCover, 'covers');
    if ($uploadPreview) delete_file($uploadPreview, 'previews');
    
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Nama buku dan penulis wajib diisi']);
    exit;
}

try {
    // 4. Generate Slug
    $slug = generateUniqueBookSlug($pdo, $fields['nama_buku']);

    // 5. Masukkan data ke Database (Termasuk Kolom SLUG)
    $stmt = $pdo->prepare("INSERT INTO books 
        (nama_buku, slug, nama_penulis, nama_tata_letak, nama_editor, isbn, jumlah_halaman, 
         ukuran_buku, deskripsi_buku, harga_buku, tahun_terbit, foto_buku, preview_pdf)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");

    $stmt->execute([
        $fields['nama_buku'],
        $slug, // Insert slug di sini
        $fields['nama_penulis'],
        $fields['nama_tata_letak'],
        $fields['nama_editor'],
        $fields['isbn'],
        $fields['jumlah_halaman'],
        $fields['ukuran_buku'],
        $fields['deskripsi_buku'],
        $fields['harga_buku'],
        $fields['tahun_terbit'],
        $fields['foto_buku'],
        $fields['preview_pdf']
    ]);

    http_response_code(201); 
    echo json_encode([
        'success' => true,
        'message' => 'Buku berhasil ditambahkan',
        'id'      => $pdo->lastInsertId(),
        'slug'    => $slug
    ]);

} catch (Exception $e) {
    if ($uploadCover) delete_file($uploadCover, 'covers');
    if ($uploadPreview) delete_file($uploadPreview, 'previews');
    
    error_log("Database INSERT Error: " . $e->getMessage()); 
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Terjadi kesalahan database.']);
}
?>