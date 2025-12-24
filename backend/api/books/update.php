<?php
// api/books/update.php

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

require '../../config/database.php'; 
require '../../includes/functions.php'; 
require '../../middleware/auth.php'; 

// Verifikasi ID
$id = $_POST['id'] ?? null;
if (!$id || !is_numeric($id)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID buku tidak valid']);
    exit;
}

/**
 * Generate slug unik untuk tabel books (kecualikan ID buku yang sedang diupdate)
 */
function generateUniqueBookSlug($pdo, $title, $currentId = null) {
    $slug = strtolower($title);
    $slug = preg_replace('/[^a-z0-9-]+/', '-', $slug);
    $slug = trim($slug, '-');
    $slug = $slug ?: 'buku';

    $sql = "SELECT id FROM books WHERE slug = ?";
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
    // 1. Ambil data buku lama (untuk handle file lama)
    $stmt = $pdo->prepare("SELECT foto_buku, preview_pdf FROM books WHERE id = ?");
    $stmt->execute([$id]);
    $book = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$book) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Buku tidak ditemukan']);
        exit;
    }

    $currentCover = $book['foto_buku'];
    $currentPdf   = $book['preview_pdf'];

    // 2. === HANDLE UPLOAD COVER BARU ===
    if (isset($_FILES['foto_buku']) && $_FILES['foto_buku']['error'] === UPLOAD_ERR_OK) {
        if ($currentCover) {
            delete_file($currentCover, 'covers'); 
        }
        $new_cover = upload_file($_FILES['foto_buku'], 'covers', ['jpg', 'jpeg', 'png', 'webp', 'gif']);
        if ($new_cover) $currentCover = $new_cover;
    } 
    elseif (isset($_POST['hapus_foto']) && $_POST['hapus_foto'] === '1') {
        if ($currentCover) delete_file($currentCover, 'covers');
        $currentCover = null;
    }

    // 3. === HANDLE UPLOAD PREVIEW PDF BARU ===
    if (isset($_FILES['preview_pdf']) && $_FILES['preview_pdf']['error'] === UPLOAD_ERR_OK) {
        if ($currentPdf) {
            delete_file($currentPdf, 'previews');
        }
        $new_pdf = upload_file($_FILES['preview_pdf'], 'previews', ['pdf']);
        if ($new_pdf) $currentPdf = $new_pdf;
    }
    elseif (isset($_POST['hapus_pdf']) && $_POST['hapus_pdf'] === '1') {
        if ($currentPdf) delete_file($currentPdf, 'previews');
        $currentPdf = null;
    }

    // 4. === AMBIL DATA FORM & GENERATE SLUG ===
    $nama_buku = trim($_POST['nama_buku'] ?? '');
    $nama_penulis = trim($_POST['nama_penulis'] ?? '');
    
    if (empty($nama_buku) || empty($nama_penulis)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Nama buku dan penulis wajib diisi']);
        exit;
    }

    $newSlug = generateUniqueBookSlug($pdo, $nama_buku, $id);

    // 5. === UPDATE DATA KE DATABASE ===
    $sql = "UPDATE books SET 
                nama_buku = ?,
                slug = ?,
                nama_penulis = ?,
                nama_tata_letak = ?,
                nama_editor = ?,
                isbn = ?,
                jumlah_halaman = ?,
                ukuran_buku = ?,
                deskripsi_buku = ?,
                harga_buku = ?,
                tahun_terbit = ?,
                foto_buku = ?,
                preview_pdf = ?
            WHERE id = ?";

    $stmt = $pdo->prepare($sql);
    $success = $stmt->execute([
        $nama_buku,
        $newSlug,
        $nama_penulis,
        $_POST['nama_tata_letak'] ?? null,
        $_POST['nama_editor']    ?? null,
        $_POST['isbn']           ?? null,
        empty($_POST['jumlah_halaman']) ? null : $_POST['jumlah_halaman'],
        $_POST['ukuran_buku']    ?? null,
        $_POST['deskripsi_buku'] ?? null,
        empty($_POST['harga_buku'])     ? null : $_POST['harga_buku'], 
        empty($_POST['tahun_terbit'])    ? null : $_POST['tahun_terbit'], 
        $currentCover,       
        $currentPdf,    
        $id
    ]);

    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'Buku berhasil diperbarui',
            'slug'    => $newSlug
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Gagal menyimpan ke database']);
    }

} catch (Exception $e) {
    http_response_code(500);
    error_log("Update Book Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>