<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>CRUD - Vanilla HTML, CSS, JavaScript, PHP</title>

	<link rel="stylesheet" href="./main.css">
</head>
<body>
	<?php 
		include './header.php';

		$db = new PDO(DB_DSN, DB_USER, DB_PASSWORD);

		$users = $db->query("SELECT * FROM users")->fetchAll(PDO::FETCH_OBJ);
	?>

	<main>
		<div>
			<div class="table-header">
				<a href="/form" class="button button-success" type="button">Add New</a>
			</div>

			<table>
				<tr>
					<th>ID</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone Number</th>
					<th>Actions</th>
				</tr>

				<?php if (empty($users)): ?>
					<tr>
						<td class="table-empty" colspan="6">There are no users yet.</td>
					</tr>

				<?php else: ?>
					<?php foreach ($users as $user): ?>
						<tr>
							<td><?= $user->id ?></td>
							<td><?= $user->first_name ?></td>
							<td><?= $user->last_name ?></td>
							<td><?= $user->email ?></td>
							<td><?= $user->phone ?></td>
							<td>
								<a class="button button-info" href=<?= "/form?id=$user->id" ?> >
									Edit
								</a>

								<button type="button" class="button button-danger delete-btn" data-id="<?= $user->id ?>">
									Delete
								</button>
							</td>
						</tr>
					<?php endforeach ?>
				<?php endif ?>
			</table>
		</div>
	</main>

	<script src="./index.js"></script>
</body>
</html>
