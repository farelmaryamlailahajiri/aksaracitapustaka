<?php
session_start();
include "../config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM admin WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);
    $admin = mysqli_fetch_assoc($result);

    if ($admin && password_verify($password, $admin['password'])) {
        $_SESSION['admin'] = $admin['username'];
        header("Location: ../dashboard.php");
        exit();
    } else {
        echo "Username atau password salah!";
    }
}
?>
