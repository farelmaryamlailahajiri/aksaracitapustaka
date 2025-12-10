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

try {
    // 1. Ambil data buku lama (khususnya file)
    $stmt = $pdo->prepare("SELECT foto_buku, preview_pdf FROM books WHERE id = ?");
    $stmt->execute([$id]);
    $book = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$book) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Buku tidak ditemukan']);
        exit;
    }

    // Default: gunakan file lama
    $foto_buku   = $book['foto_buku'];
    $preview_pdf = $book['preview_pdf'];

    // 2. === UPLOAD COVER BARU (jika ada) ===
    if (isset($_FILES['foto_buku']) && $_FILES['foto_buku']['error'] === UPLOAD_ERR_OK) {
        // Hapus file lama jika ada
        if ($foto_buku) {
            // Asumsi: delete_file(filename, 'directory') berada di includes/functions.php
            delete_file($foto_buku, 'covers'); 
        }

        $new_cover = upload_file($_FILES['foto_buku'], 'covers', ['jpg', 'jpeg', 'png', 'webp', 'gif']);
        if ($new_cover === false) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Cover: Ekstensi tidak diizinkan']);
            exit;
        }
        if ($new_cover === null) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Cover: Gagal mengunggah file']);
            exit;
        }
        $foto_buku = $new_cover;
    }
    // Jika tidak ada file baru, gunakan nama file lama yang dikirim dari form
    elseif (!empty($_POST['foto_buku_lama'])) {
        $foto_buku = $_POST['foto_buku_lama'];
    } else {
        // Jika file lama dihapus dari form dan tidak ada file baru
        $foto_buku = null;
    }

    // 3. === UPLOAD PREVIEW PDF BARU (jika ada) ===
    if (isset($_FILES['preview_pdf']) && $_FILES['preview_pdf']['error'] === UPLOAD_ERR_OK) {
        if ($preview_pdf) {
            delete_file($preview_pdf, 'previews');
        }

        $new_pdf = upload_file($_FILES['preview_pdf'], 'previews', ['pdf']);
        if ($new_pdf === false) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'PDF: Hanya file .pdf yang diizinkan']);
            exit;
        }
        if ($new_pdf === null) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'PDF: Gagal mengunggah file']);
            exit;
        }
        $preview_pdf = $new_pdf;
    }
    // Jika tidak ada file baru, gunakan nama file lama yang dikirim dari form
    elseif (!empty($_POST['preview_pdf_lama'])) {
        $preview_pdf = $_POST['preview_pdf_lama'];
    } else {
        $preview_pdf = null;
    }


    // 4. === UPDATE DATA KE DATABASE ===
    $sql = "UPDATE books SET 
                nama_buku = ?,
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
        $_POST['nama_buku']          ?? '',
        $_POST['nama_penulis']       ?? '',
        $_POST['nama_tata_letak']    ?? null,
        $_POST['nama_editor']        ?? null,
        $_POST['isbn']               ?? null,
        // Pastikan nilai null jika string kosong dari frontend
        empty($_POST['jumlah_halaman']) ? null : $_POST['jumlah_halaman'],
        $_POST['ukuran_buku']        ?? null,
        $_POST['deskripsi_buku']     ?? null,
        // Pastikan nilai null jika string kosong dari frontend
        empty($_POST['harga_buku']) ? null : $_POST['harga_buku'], 
        // Pastikan nilai null jika string kosong dari frontend
        empty($_POST['tahun_terbit']) ? null : $_POST['tahun_terbit'], 
        $foto_buku,      
        $preview_pdf,    
        $id
    ]);

    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'Buku berhasil diperbarui'
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
    error_log("Update Book Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>