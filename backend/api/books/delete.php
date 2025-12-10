<?php
// api/books/delete.php

header('Content-Type: application/json; charset=utf-8');

// Header CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: X-Auth-Token, Content-Type');

// Handle Preflight Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 🔥 PASTIKAN JALUR INI BENAR SESUAI STRUKTUR FOLDER ANDA
require '../../config/database.php'; // Koneksi PDO
require '../../includes/functions.php'; // Berisi fungsi delete_file()
require '../../middleware/auth.php'; // Otentikasi Admin


// Ambil data JSON dari body
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;

if (!$id || !is_numeric($id)) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'ID buku tidak valid.']);
    exit;
}

try {
    // 1. Ambil nama file sebelum menghapus entri DB
    $stmt = $pdo->prepare("SELECT foto_buku, preview_pdf FROM books WHERE id = ?");
    $stmt->execute([$id]);
    $book = $stmt->fetch(PDO::FETCH_ASSOC); // Gunakan FETCH_ASSOC untuk konsistensi

    if (!$book) {
        http_response_code(404); // Not Found
        echo json_encode(['success' => false, 'message' => 'Buku tidak ditemukan.']);
        exit;
    }

    // 2. Hapus file fisik jika ada
    // Asumsi fungsi delete_file(filename, directory_folder_name)
    if ($book['foto_buku']) {
        delete_file($book['foto_buku'], 'covers'); 
    }
    if ($book['preview_pdf']) {
        delete_file($book['preview_pdf'], 'previews');
    }

    // 3. Hapus entri dari database
    $stmt = $pdo->prepare("DELETE FROM books WHERE id = ?");
    $success = $stmt->execute([$id]);

    if ($success) {
        http_response_code(200); // OK
        echo json_encode(['success' => true, 'message' => 'Buku berhasil dihapus.']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus dari database.']);
    }
    
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    error_log("Delete Book Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Terjadi kesalahan server: ' . $e->getMessage()]);
}
?>