<?php
// api/articles/get.php
// LOGIKA SAMA PERSIS DENGAN api/books/get.php (yang sudah terbukti jalan)

header('Content-Type: application/json; charset=utf-8');

// CORS Header
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: X-Auth-Token, Content-Type');

// Handle Preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../config/database.php';           // Sama seperti buku
require '../../middleware/auth.php';          // Otentikasi admin (sama)

// Pastikan auth middleware sudah jalan dan $pdo tersedia
try {
    $id = $_GET['id'] ?? null;
    $response_data = [];

    if ($id && is_numeric($id)) {
        // Ambil SATU artikel berdasarkan ID (dipakai EditArticle & DetailArticle)
        $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ?");
        $stmt->execute([$id]);
        $article = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($article) {
            $response_data = $article;                    // objek tunggal
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Artikel tidak ditemukan.']);
            exit;
        }

    } elseif (!$id) {
        // Ambil SEMUA artikel (dipakai Dashboard)
        $stmt = $pdo->query("SELECT * FROM articles ORDER BY created_at DESC");
        $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response_data = $articles ?: [];                 // array (bisa kosong)
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID artikel tidak valid.']);
        exit;
    }

    // Respons sukses — format persis sama dengan books/get.php
    echo json_encode([
        'success' => true,
        'data'    => $response_data
    ]);

} catch (Exception $e) {
    http_response_code(500);
    error_log("GET Articles Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Terjadi kesalahan server saat mengambil data artikel.'
    ]);
};
?>