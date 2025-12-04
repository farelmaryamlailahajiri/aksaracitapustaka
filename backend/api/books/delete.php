<?php
header('Content-Type: application/json');
require '../../includes/auth.php';
require '../../includes/functions.php';
require '../middleware/auth.php';
require_login();

// Ambil data JSON dari body
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'ID tidak ditemukan']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT foto_buku, preview_pdf FROM books WHERE id = ?");
    $stmt->execute([$id]);
    $book = $stmt->fetch();

    if ($book) {
        delete_file($book['foto_buku'], 'covers/');
        delete_file($book['preview_pdf'], 'previews/');
    }

    $stmt = $pdo->prepare("DELETE FROM books WHERE id = ?");
    $success = $stmt->execute([$id]);

    echo json_encode(['success' => $success]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>