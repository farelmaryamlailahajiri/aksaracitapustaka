<?php
// backend/includes/functions.php (VERSI DIPERBAIKI)
define('BASE_UPLOAD_PATH', dirname(__DIR__, 2) . '/uploads/');

/**
 * Mengunggah file dengan validasi ekstensi dan mengembalikan nama file baru.
 *
 * @param array $file Array $_FILES['nama_input'] dari form.
 * @param string $folder Subfolder di dalam uploads (misal: 'covers', 'previews').
 * @param array $allowed_ext Array ekstensi yang diizinkan (misal: ['jpg', 'png']).
 * @return string|bool Nama file baru jika berhasil, FALSE jika gagal/ekstensi tidak diizinkan.
 */
function upload_file($file, $folder, $allowed_ext = []) {
    // Cek apakah file benar-benar ada dan tidak ada error
    if (!isset($file['tmp_name']) || empty($file['name']) || $file['error'] !== 0) {
        return null;
    }
    
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    // 1. Validasi Ekstensi
    if (!empty($allowed_ext) && !in_array($ext, $allowed_ext)) {
        return false; // Mengembalikan FALSE jika ekstensi tidak diizinkan
    }

    // 2. Tentukan Path Lengkap dan Buat Folder jika belum ada
    $upload_dir = BASE_UPLOAD_PATH . $folder . '/';
    
    if (!is_dir($upload_dir)) {
        // Buat folder dengan izin 0777 (harus dapat diakses oleh server web)
        mkdir($upload_dir, 0777, true);
    }
    
    // 3. Pindahkan File
    $name = uniqid('file_') . '.' . $ext;
    $path = $upload_dir . $name;
    
    if (move_uploaded_file($file['tmp_name'], $path)) {
        return $name;
    }
    return false; // Mengembalikan FALSE jika gagal move_uploaded_file
}

/**
 * Menghapus file dari folder uploads yang aman.
 *
 * @param string $filename Nama file yang tersimpan di DB.
 * @param string $folder Subfolder di dalam uploads (misal: 'covers', 'previews').
 */
function delete_file($filename, $folder = '') {
    if (!$filename) return;
    
    // Gunakan BASE_UPLOAD_PATH agar jalur konsisten
    // basename() digunakan untuk mencegah serangan directory traversal (misal: nama file ../)
    $path = BASE_UPLOAD_PATH . ($folder ? "$folder/" : "") . basename($filename);
    
    if (file_exists($path)) {
        // @unlink() digunakan untuk menghapus file dan menekan error jika gagal
        @unlink($path);
    }
}
?>