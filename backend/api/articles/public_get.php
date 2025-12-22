<?php
// api/articles/public_get.php
// Endpoint PUBLIC: ambil semua artikel (tidak butuh login)

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
            nama_buku AS judul,           -- jadi judul artikel
            slug,
            nama_penulis AS penulis,      -- opsional: rename biar lebih jelas
            isi_articles,
            foto_buku AS foto_artikel,    -- rename agar konsisten dengan file.php
            created_at
        FROM articles 
        ORDER BY created_at DESC
    ");

    $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data'    => $articles
    ]);

} catch (Exception $e) {
    error_log("Article public_get error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal memuat daftar artikel'
    ]);
}
?>