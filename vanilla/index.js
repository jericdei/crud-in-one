const deleteButton = document.querySelectorAll('button.delete-btn');

deleteButton.forEach((button) => {
	button.addEventListener('click', async () => {
		if (confirm('Are you sure you want to delete this user?')) {
			const id = button.getAttribute('data-id');

			const res = await fetch('/delete.php', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: id,
				})
			})

			if (res.ok)
				window.location.reload();
		}
	})
})
