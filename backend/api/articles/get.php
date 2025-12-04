<?php
header('Content-Type: application/json; charset=utf-8');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: X-Auth-Token');

require '../../../backend/config/database.php';
require '../../../backend/middleware/auth.php';

try {
    $id = $_GET['id'] ?? null;

    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ?");
        $stmt->execute([$id]);
        $article = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($article ? [$article] : []);
    } else {
        $stmt = $pdo->query("SELECT * FROM articles ORDER BY created_at DESC");
        $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($articles ?: []);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([]);
}
?>