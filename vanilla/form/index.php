<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Create User</title>

	<link rel="stylesheet" href="../main.css">
	<link rel="stylesheet" href="create.css">
</head>
<body>
	<?php
		include '../header.php';

		$id = $_GET['id'] ?? null;

		if (!empty($id)) {
			$db = new PDO(DB_DSN, DB_USER, DB_PASSWORD);

			$prep = $db->prepare("SELECT first_name, last_name, email, phone FROM users WHERE id = ?;");

			$prep->execute([$id]);

			$user = $prep->fetch();
		}
	?>

	<main>
		<div>
			<h1 class="title">
				<?= $id ? "Edit {$user['first_name']} {$user['last_name']}" : 'Create new user' ?>
			</h1>

			<form action="./upsert.php" method="POST">
				<input type="hidden" name="id" value="<?= $id ?>">

				<div>
					<div class="input-group">
						<label for="first_name">First Name</label>
						<input type="text" name="first_name" value="<?= $user['first_name'] ?? '' ?>" />
					</div>

					<div class="input-group">
						<label for="last_name">Last Name</label>
						<input type="text" name="last_name" value="<?= $user['last_name'] ?? '' ?>" />
					</div>

					<div class="input-group">
						<label for="email">Email</label>
						<input type="email" name="email" value="<?= $user['email'] ?? '' ?>" />
					</div>

					<div class="input-group">
						<label for="phone">Phone Number</label>
						<input type="number" name="phone" value="<?= $user['phone'] ?? '' ?>" />
					</div>

					<button class="button button-success" type="submit">Submit</button>
				</div>
			</form>
		</div>
	</main>
</body>
</html>
