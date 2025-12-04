<?php
// backend/api/books/create.php

header('Content-Type: application/json');
require '../../config/database.php';
require '../../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

if (!function_exists('null_if_empty')) {
    function null_if_empty($value) {
        $trimmed = trim($value ?? '');
        return empty($trimmed) ? null : $trimmed;
    }
}

$uploadCover = null;
$uploadPreview = null;
$errorUpload = false;
$errorMessage = '';

// 2. Upload Cover
if (isset($_FILES['foto_buku']) && $_FILES['foto_buku']['error'] === 0) {
    $allowedCover = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $fileCover = $_FILES['foto_buku'];
    
    // Panggil fungsi helper upload_file (sudah diperbaiki untuk validasi)
    $uploadCover = upload_file($fileCover, 'covers', $allowedCover);
    
    if ($uploadCover === false) {
        $errorUpload = true;
        $errorMessage = 'Format cover tidak didukung atau gagal upload cover.';
    }
}

// 3. Upload Preview PDF
if (!$errorUpload && isset($_FILES['preview_pdf']) && $_FILES['preview_pdf']['error'] === 0) {
    $allowedPreview = ['pdf'];
    $filePreview = $_FILES['preview_pdf'];
    
    $uploadPreview = upload_file($filePreview, 'previews', $allowedPreview);
    
    if ($uploadPreview === false) {
        $errorUpload = true;
        $errorMessage = 'File preview harus PDF atau gagal upload PDF.';
        
        // Rollback: Hapus cover yang sudah terupload jika upload PDF gagal
        if ($uploadCover) {
            delete_file($uploadCover, 'covers');
        }
    }
}

// Jika terjadi error upload, hentikan proses
if ($errorUpload) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $errorMessage]);
    exit;
}


$fields = [
    // FIELD WAJIB (dibiarkan string kosong "" agar validasi di bawah menangkapnya)
    'nama_buku'        => $_POST['nama_buku'] ?? '',
    'nama_penulis'     => $_POST['nama_penulis'] ?? '',

    // FIELD OPSIONAL: Gunakan null_if_empty()
    'nama_tata_letak'  => null_if_empty($_POST['nama_tata_letak']),
    'nama_editor'      => null_if_empty($_POST['nama_editor']),
    'isbn'             => null_if_empty($_POST['isbn']),
    
    // KRITIS: Numerik (INT/YEAR) dan Harga (Jika kosong, dikirim sebagai NULL)
    'jumlah_halaman'   => empty($_POST['jumlah_halaman']) ? null : (int)null_if_empty($_POST['jumlah_halaman']), 
    'harga_buku'       => empty($_POST['harga_buku']) ? null : (int)null_if_empty($_POST['harga_buku']),
    'tahun_terbit'     => empty($_POST['tahun_terbit']) ? null : (int)null_if_empty($_POST['tahun_terbit']),
    
    // Lainnya
    'ukuran_buku'      => null_if_empty($_POST['ukuran_buku']),
    'deskripsi_buku'   => null_if_empty($_POST['deskripsi_buku']),
    
    // File
    'foto_buku'        => $uploadCover, 
    'preview_pdf'      => $uploadPreview, 
];

// Validasi Wajib (Wajib diisi)
if (empty($fields['nama_buku']) || empty($fields['nama_penulis'])) {
    // Rollback: Hapus file yang mungkin sudah terupload
    if ($uploadCover) delete_file($uploadCover, 'covers');
    if ($uploadPreview) delete_file($uploadPreview, 'previews');
    
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Nama buku dan penulis wajib diisi']);
    exit;
}

// -----------------------------------------------------
// 5. Masukkan data ke Database
// -----------------------------------------------------
try {
    $stmt = $pdo->prepare("INSERT INTO books 
        (nama_buku, nama_penulis, nama_tata_letak, nama_editor, isbn, jumlah_halaman, 
         ukuran_buku, deskripsi_buku, harga_buku, tahun_terbit, foto_buku, preview_pdf)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");

    $stmt->execute([
        $fields['nama_buku'],
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

    http_response_code(201); // Created
    echo json_encode([
        'success' => true,
        'message' => 'Buku berhasil ditambahkan',
        'id' => $pdo->lastInsertId()
    ]);

} catch (Exception $e) {
    // Rollback: Jika terjadi error database, hapus file yang sudah terupload
    if ($uploadCover) delete_file($uploadCover, 'covers');
    if ($uploadPreview) delete_file($uploadPreview, 'previews');
    
    http_response_code(500);
    // Tampilkan pesan error detail di log server
    error_log("Database INSERT Error: " . $e->getMessage()); 
    echo json_encode(['success' => false, 'message' => 'Terjadi kesalahan database. Detail telah dicatat di log server.']);
}
?>