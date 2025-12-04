<?php
$type = $_GET['t'] ?? '';
$file = $_GET['f'] ?? '';

$allowed = ['covers', 'previews'];
if (!in_array($type, $allowed) || empty($file) || strpos($file, '..') !== false) {
    http_response_code(403);
    die('Access denied');
}

$path = "../../uploads/{$type}/" . basename($file);

if (!file_exists($path)) {
    http_response_code(404);
    die('File not found');
}

$mime = $type === 'previews' ? 'application/pdf' : mime_content_type($path);
header('Content-Type: ' . $mime);
header('Content-Disposition: inline; filename="' . basename($path) . '"');
readfile($path);