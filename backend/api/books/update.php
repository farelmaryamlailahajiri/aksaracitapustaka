<?php
header('Content-Type: application/json');
require '../../includes/auth.php';
require '../../includes/functions.php';
require '../middleware/auth.php';
require_login();

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'ID tidak ditemukan']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT foto_buku, preview_pdf FROM books WHERE id = ?");
    $stmt->execute([$id]);
    $old = $stmt->fetch();

    $foto_buku = $old['foto_buku'];
    $preview_pdf = $old['preview_pdf'];

    // Upload file baru jika ada
    if (!empty($_FILES['foto_buku']['name'])) {
        delete_file($old['foto_buku'], 'covers/');
        $foto_buku = upload_file($_FILES['foto_buku'], 'covers/');
    }
    if (!empty($_FILES['preview_pdf']['name'])) {
        delete_file($old['preview_pdf'], 'previews/');
        $preview_pdf = upload_file($_FILES['preview_pdf'], 'previews/');
    }

    $stmt = $pdo->prepare("UPDATE books SET 
        nama_buku=?, nama_penulis=?, nama_tata_letak=?, nama_editor=?, isbn=?, jumlah_halaman=?,
        ukuran_buku=?, deskripsi_buku=?, harga_buku=?, tahun_terbit=?, foto_buku=?, preview_pdf=?
        WHERE id=?");

    $success = $stmt->execute([
        $data['nama_buku'], $data['nama_penulis'], $data['nama_tata_letak'] ?? null,
        $data['nama_editor'] ?? null, $data['isbn'] ?? null, $data['jumlah_halaman'] ?? null,
        $data['Ukuran_buku'] ?? null, $data['deskripsi_buku'] ?? null, $data['harga_buku'] ?? null,
        $data['tahun_terbit'] ?? null, $foto_buku, $preview_pdf, $id
    ]);

    echo json_encode(['success' => $success]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>