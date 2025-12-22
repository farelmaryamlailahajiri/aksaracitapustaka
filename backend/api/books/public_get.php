<?php
// backend/api/books/public_get.php
// Endpoint KHUSUS untuk halaman depan (TIDAK BUTUH LOGIN)

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../config/database.php'; // koneksi $pdo

try {
    $stmt = $pdo->query("
        SELECT 
            id, 
            nama_buku, 
            nama_penulis, 
            foto_buku, 
            harga_buku, 
            tahun_terbit,
            deskripsi_buku,
            isbn,
            jumlah_halaman,
            ukuran_buku,
            preview_pdf
        FROM books 
        ORDER BY created_at DESC
    ");

    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $books
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal memuat buku'
    ]);
}
?>