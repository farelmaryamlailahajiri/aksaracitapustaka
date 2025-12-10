<?php
// backend/api/articles/update.php
// LOGIKA 100% SAMA DENGAN books/update.php (yang sudah aman)

header('Content-Type: application/json; charset=utf-8');

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: X-Auth-Token, Content-Type');

// Handle Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../config/database.php';
require '../../includes/functions.php';
require '../../middleware/auth.php';   // otentikasi admin (wajib!)

// Validasi ID
$id = $_POST['id'] ?? null;
if (!$id || !is_numeric($id)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID artikel tidak valid']);
    exit;
}

try {
    // 1. Ambil data artikel lama (khususnya foto)
    $stmt = $pdo->prepare("SELECT foto_buku FROM articles WHERE id = ?");
    $stmt->execute([$id]);
    $article = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$article) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Artikel tidak ditemukan']);
        exit;
    }

    // Default: pakai foto lama
    $foto_buku = $article['foto_buku'];

    // 2. === UPLOAD GAMBAR BARU (jika ada) ===
    if (isset($_FILES['foto_buku']) && $_FILES['foto_buku']['error'] === UPLOAD_ERR_OK) {
        // Hapus foto lama jika ada
        if ($foto_buku) {
            delete_file($foto_buku, 'articles');
        }

        $new_image = upload_file($_FILES['foto_buku'], 'articles', ['jpg', 'jpeg', 'png', 'webp', 'gif']);
        if ($new_image === false) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Gambar: Ekstensi tidak diizinkan']);
            exit;
        }
        if ($new_image === null) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Gambar: Gagal mengunggah file']);
            exit;
        }
        $foto_buku = $new_image;

    }
    // Jika tidak ada file baru, gunakan nama file lama yang dikirim dari frontend
    elseif (!empty($_POST['foto_buku_lama'])) {
        $foto_buku = $_POST['foto_buku_lama'];
    } 
    // Jika user sengaja menghapus gambar (kosongin input file + tidak kirim foto_buku_lama)
    else {
        // Hapus file lama dari server
        if ($foto_buku) {
            delete_file($foto_buku, 'articles');
        }
        $foto_buku = null;
    }

    // 3. === UPDATE KE DATABASE ===
    $sql = "UPDATE articles SET 
                nama_buku     = ?,
                nama_penulis  = ?,
                isi_articles  = ?,
                foto_buku     = ?
            WHERE id = ?";

    $stmt = $pdo->prepare($sql);

    $success = $stmt->execute([
        $_POST['nama_buku']     ?? '',
        $_POST['nama_penulis']  ?? '',
        $_POST['isi_articles']  ?? null,   // boleh kosong → null
        $foto_buku,
        $id
    ]);

    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'Artikel berhasil diperbarui'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal menyimpan ke database'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    error_log("Update Article Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Server error saat update artikel'

    ]);
}
?>