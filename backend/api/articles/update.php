<?php
header('Content-Type: application/json');
require '../../includes/auth.php';
require '../../includes/functions.php';
require '../middleware/auth.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $stmt = $pdo->prepare("SELECT foto_buku FROM articles WHERE id = ?");
    $stmt->execute([$_POST['id']]);
    $old = $stmt->fetch();

    $foto_buku = $old['foto_buku'];
    if (!empty($_FILES['foto_buku']['name'])) {
        delete_file($old['foto_buku']);
        $foto_buku = upload_file($_FILES['foto_buku'], 'articles/');
    }

    $stmt = $pdo->prepare("UPDATE articles SET 
        nama_buku = ?, nama_penulis = ?, foto_buku = ?, isi_artikel = ?
        WHERE id = ?");

    $success = $stmt->execute([
        $_POST['nama_buku'],
        $_POST['nama_penulis'],
        $foto_buku,
        $_POST['isi_artikel'],
        $_POST['id']
    ]);

    echo json_encode(['success' => $success]);
}
?>