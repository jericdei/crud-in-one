<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/config.inc.php';

$db = new PDO(DB_DSN, DB_USER, DB_PASSWORD);

$data = file_get_contents("php://input");
$id = json_decode($data, true)['id']; 

$db->prepare("DELETE FROM users WHERE id = ?")
	->execute([$id]);

echo 'User has been deleted.';
