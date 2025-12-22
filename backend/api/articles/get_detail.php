<?php
// api/articles/get_detail.php
// Endpoint PUBLIC: ambil detail satu artikel berdasarkan ID atau slug (tidak butuh login)

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../config/database.php'; // koneksi $pdo

// Ambil parameter: bisa id atau slug
$id   = $_GET['id'] ?? null;
$slug = $_GET['slug'] ?? null;

if (!$id && !$slug) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Parameter id atau slug harus disertakan'
    ]);
    exit;
}

try {
    if ($id && is_numeric($id)) {
        // Cari berdasarkan ID
        $stmt = $pdo->prepare("
            SELECT 
                id,
                nama_buku AS judul,
                slug,
                nama_penulis AS penulis,
                isi_articles,
                foto_buku AS foto_artikel,
                created_at
            FROM articles 
            WHERE id = ?
        ");
        $stmt->execute([$id]);
    } else {
        // Cari berdasarkan slug
        $stmt = $pdo->prepare("
            SELECT 
                id,
                nama_buku AS judul,
                slug,
                nama_penulis AS penulis,
                isi_articles,
                foto_buku AS foto_artikel,
                created_at
            FROM articles 
            WHERE slug = ?
        ");
        $stmt->execute([$slug]);
    }

    $article = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($article) {
        echo json_encode([
            'success' => true,
            'data'    => $article
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Artikel tidak ditemukan'
        ]);
    }

} catch (Exception $e) {
    error_log("Article get_detail error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal memuat detail artikel'
    ]);
}
?>