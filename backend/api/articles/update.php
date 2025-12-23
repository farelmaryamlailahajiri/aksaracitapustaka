<?php
// backend/api/articles/update.php
// Endpoint update artikel (hanya admin)

header('Content-Type: application/json; charset=utf-8');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: X-Auth-Token, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../config/database.php';
require '../../includes/functions.php';     // upload_file(), delete_file()
require '../../middleware/auth.php';        // otentikasi admin

// Validasi ID
$id = $_POST['id'] ?? null;
if (!$id || !is_numeric($id)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID artikel tidak valid']);
    exit;
}

// Fungsi generate slug unik (kecualikan ID artikel yang sedang diupdate)
function generateUniqueSlug($pdo, $title, $currentId = null) {
    $slug = strtolower($title);
    $slug = preg_replace('/[^a-z0-9-]+/', '-', $slug);
    $slug = trim($slug, '-');
    $slug = $slug ?: 'artikel';

    $sql = "SELECT id FROM articles WHERE slug = ?";
    $params = [$slug];
    if ($currentId !== null) {
        $sql .= " AND id != ?";
        $params[] = $currentId;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    if ($stmt->rowCount() === 0) {
        return $slug;
    }

    $counter = 1;
    while (true) {
        $newSlug = $slug . '-' . $counter;
        $params[0] = $newSlug;
        $stmt->execute($params);
        if ($stmt->rowCount() === 0) {
            return $newSlug;
        }
        $counter++;
    }
}

try {
    // 1. Ambil data artikel lama (untuk foto lama)
    $stmt = $pdo->prepare("SELECT foto_buku FROM articles WHERE id = ?");
    $stmt->execute([$id]);
    $oldArticle = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$oldArticle) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Artikel tidak ditemukan']);
        exit;
    }

    $currentFoto = $oldArticle['foto_buku']; // default: pakai foto lama

    // 2. === HANDLE UPLOAD FOTO BARU ATAU HAPUS FOTO ===
    if (isset($_FILES['foto_buku']) && $_FILES['foto_buku']['error'] === UPLOAD_ERR_OK) {
        // Hapus foto lama jika ada
        if ($currentFoto) {
            delete_file($currentFoto, 'articles');
        }

        $newImage = upload_file($_FILES['foto_buku'], 'articles', ['jpg', 'jpeg', 'png', 'webp', 'gif']);
        if ($newImage === false) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Gambar: Ekstensi tidak diizinkan']);
            exit;
        }
        if ($newImage === null) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Gambar: Gagal upload']);
            exit;
        }
        $currentFoto = $newImage;
    }
    // Hapus foto secara eksplisit
    elseif (isset($_POST['hapus_foto']) && $_POST['hapus_foto'] === '1') {
        if ($currentFoto) {
            delete_file($currentFoto, 'articles');
        }
        $currentFoto = null;
    }
    // Jika frontend kirim foto_buku_lama (opsional, untuk konfirmasi)
    elseif (!empty($_POST['foto_buku_lama'])) {
        $currentFoto = $_POST['foto_buku_lama'];
    }

    // 3. === AMBIL DATA DARI FORM ===
    $nama_buku    = trim($_POST['nama_buku'] ?? '');
    $nama_penulis = trim($_POST['nama_penulis'] ?? '');  // TAMBAHAN: wajib
    $isi_articles = $_POST['isi_articles'] ?? null;     // boleh kosong

    // Validasi field wajib
    if (empty($nama_buku) || empty($nama_penulis)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Judul artikel dan nama penulis wajib diisi'
        ]);
        exit;
    }

    // 4. === GENERATE SLUG BARU (jika judul berubah) ===
    $newSlug = generateUniqueSlug($pdo, $nama_buku, $id);

    // 5. === UPDATE DATABASE ===
    $sql = "UPDATE articles SET 
                nama_buku     = ?,
                nama_penulis  = ?,
                slug          = ?,
                isi_articles  = ?,
                foto_buku     = ?
            WHERE id = ?";

    $stmt = $pdo->prepare($sql);

    $success = $stmt->execute([
        $nama_buku,
        $nama_penulis,     // nilai penulis baru
        $newSlug,
        $isi_articles,
        $currentFoto,
        $id
    ]);

    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'Artikel berhasil diperbarui',
            'slug'    => $newSlug,
            'url'     => '/article/' . $newSlug
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Gagal update database']);
    }

} catch (Exception $e) {
    error_log("Update Article Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error saat update artikel'
    ]);
}
?>