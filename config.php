<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'kerosinka_db';
$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Ошибка подключения к базе данных: " . $conn->connect_error);
}
$conn->set_charset("utf8");
?>