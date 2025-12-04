<?php
header('Content-Type: application/json');
require '../../includes/functions.php';
require '../middleware/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $foto_buku = upload_file($_FILES['foto_buku'] ?? [], 'articles/');

    $stmt = $pdo->prepare("INSERT INTO articles 
        (nama_buku, nama_penulis, foto_buku, isi_artikel)
        VALUES (?, ?, ?, ?)");

    $success = $stmt->execute([
        $_POST['nama_buku'],
        $_POST['nama_penulis'],
        $foto_buku,
        $_POST['isi_artikel']
    ]);

    echo json_encode(['success' => $success, 'id' => $pdo->lastInsertId()]);
}
?>