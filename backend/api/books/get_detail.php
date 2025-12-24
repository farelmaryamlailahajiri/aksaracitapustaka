<?php
// backend/api/books/get_detail.php
// Endpoint PUBLIC: ambil detail satu buku berdasarkan ID atau slug (tidak butuh login)

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
// Sesuai contoh artikel, kita cek keduanya
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
                nama_buku, 
                slug,
                nama_penulis, 
                nama_editor,
                nama_tata_letak,
                foto_buku, 
                preview_pdf, 
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
    } else {
        // Cari berdasarkan slug (identifier bisa dikirim lewat param 'id' yang berisi string atau param 'slug')
        $identifier = $slug ?? $id;
        $stmt = $pdo->prepare("
            SELECT 
                id, 
                nama_buku, 
                slug,
                nama_penulis, 
                nama_editor,
                nama_tata_letak,
                foto_buku, 
                preview_pdf, 
                harga_buku, 
                tahun_terbit,
                deskripsi_buku,
                isbn,
                jumlah_halaman,
                ukuran_buku
            FROM books 
            WHERE slug = ?
        ");
        $stmt->execute([$identifier]);
    }

    $book = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($book) {
        echo json_encode([
            'success' => true,
            'data'    => $book
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Buku tidak ditemukan'
        ]);
    }

} catch (Exception $e) {
    error_log("Book get_detail error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal memuat detail buku'
    ]);
}
?>