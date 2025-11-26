<?php
session_start();
session_destroy();
header("Location: ../../admin-panel/login.php");
exit();
?>
