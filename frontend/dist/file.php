<?php

$type = $_GET['t'] ?? '';
$file = $_GET['f'] ?? '';

// Daftar tipe yang diizinkan
$allowedTypes = [
    'covers'    => 'image/',      // untuk semua image (jpeg, png, webp, dll)
    'previews'  => 'application/pdf',
    'articles'  => 'image/'
];

if (!array_key_exists($type, $allowedTypes) || empty($file)) {
    http_response_code(400);
    exit('Invalid request');
}

// Cegah directory traversal
if (strpos($file, '..') !== false || strpos($file, '\0') !== false) {
    http_response_code(403);
    exit('Access denied');
}

// Sanitasi nama file (hanya karakter aman)
if (!preg_match('/^[a-zA-Z0-9._-]+(\.[a-zA-Z0-9]+)?$/', $file)) {
    http_response_code(400);
    exit('Invalid filename');
}

$baseDir = __DIR__ . '/../../uploads/' . $type . '/';
$path    = $baseDir . basename($file);

// Pastikan file benar-benar berada di dalam folder yang diizinkan
$realPath = realpath($path);
if (!$realPath || strpos($realPath, realpath($baseDir)) !== 0) {
    http_response_code(403);
    exit('Access denied');
}

if (!file_exists($realPath)) {
    http_response_code(404);
    exit('File not found');
}

// Tentukan MIME type
if ($type === 'previews') {
    $mime = 'application/pdf';
} else {
    $mime = mime_content_type($realPath) ?: 'application/octet-stream';
}

// Header untuk menampilkan inline (bukan download)
header('Content-Type: ' . $mime);
header('Content-Disposition: inline; filename="' . basename($realPath) . '"');
header('Content-Length: ' . filesize($realPath));

// Security headers tambahan
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=31536000, immutable'); // cache 1 tahun untuk performa

// Output file
readfile($realPath);
exit;
?>