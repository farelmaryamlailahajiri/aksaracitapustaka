<?php
// Konfigurasi koneksi database
$host = "localhost";
$user = "root";       // ganti sesuai hosting
$pass = "";           // password db
$db   = "aksaracitapustaka";  // nama database kamu

// Koneksi ke MySQL
$conn = mysqli_connect($host, $user, $pass, $db);

// Cek koneksi
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

// Mengatur timezone (supaya current timestamp benar)
date_default_timezone_set('Asia/Jakarta');
?>
