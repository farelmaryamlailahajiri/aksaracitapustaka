<?php
header('Content-Type: application/json');
require '../../includes/auth.php';
require '../../includes/functions.php';
require '../middleware/auth.php';
require_login();

if (isset($_POST['id'])) {
    $stmt = $pdo->prepare("SELECT foto_buku FROM articles WHERE id = ?");
    $stmt->execute([$_POST['id']]);
    $article = $stmt->fetch();
    
    delete_file($article['foto_buku']);

    $stmt = $pdo->prepare("DELETE FROM articles WHERE id = ?");
    $success = $stmt->execute([$_POST['id']]);

    echo json_encode(['success' => $success]);
}
?>