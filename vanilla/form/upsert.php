<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/config.inc.php';

$db = new PDO(DB_DSN, DB_USER, DB_PASSWORD);

if (!empty($_POST['id'])) {
	$query = "UPDATE users SET first_name = :first_name, last_name = :last_name, email = :email, phone = :phone WHERE id = :id";
} else {
	$query = "INSERT INTO users (first_name, last_name, email, phone) VALUES (:first_name, :last_name, :email, :phone);";

	unset($_POST['id']);
}

$db->prepare($query)->execute($_POST);

header("Location: ".BASE_URL, true, 301);

exit();
