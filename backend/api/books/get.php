<?php
// api/books/get.php

header('Content-Type: application/json; charset=utf-8');

// Header CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: X-Auth-Token, Content-Type');

// Handle Preflight Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../config/database.php';
require '../../middleware/auth.php'; // Otentikasi Admin

try {
    $id = $_GET['id'] ?? null;
    $response_data = [];

    if ($id && is_numeric($id)) {
        // Ambil satu buku (digunakan oleh EditBook.jsx)
        $stmt = $pdo->prepare("SELECT * FROM books WHERE id = ?");
        $stmt->execute([$id]);
        $book = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($book) {
            // Mengembalikan objek tunggal
            $response_data = $book;
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Buku tidak ditemukan.']);
            exit;
        }
        
    } elseif (!$id) {
        // Ambil semua buku (jika tidak ada ID)
        $stmt = $pdo->query("SELECT * FROM books ORDER BY created_at DESC");
        $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Mengembalikan array data
        $response_data = $books ?: [];
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID buku tidak valid.']);
        exit;
    }
    
    // Kembalikan respons sukses, mengemas data di field 'data'
    echo json_encode([
        'success' => true,
        'data' => $response_data
    ]);

} catch (Exception $e) {
    http_response_code(500);
    error_log("GET Books Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Terjadi kesalahan server saat mengambil data buku.'
    ]);
}
?>