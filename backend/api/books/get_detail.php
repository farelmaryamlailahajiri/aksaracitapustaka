<?php
// backend/api/books/get_detail.php
// Endpoint untuk detail satu buku (public, tidak butuh login)

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../config/database.php'; // sesuaikan path

// Ambil parameter id
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'ID buku tidak valid'
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            id, 
            nama_buku, 
            nama_penulis, 
            foto_buku, 
            preview_pdf,          -- ← BARU: untuk tombol Preview
            harga_buku, 
            tahun_terbit,
            deskripsi_buku,
            isbn,
            jumlah_halaman,
            ukuran_buku
        FROM books 
        WHERE id = ?
    ");

    $stmt->execute([$id]);
    $book = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($book) {
        echo json_encode([
            'success' => true,
            'data' => $book
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Buku tidak ditemukan'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal memuat detail buku'
    ]);
}
?>