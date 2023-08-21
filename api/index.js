import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/users', async (req, res) => {
	const users = await prisma.users.findMany();

	res.json(users);
});

app.get('/users/:id', async (req, res) => {
	const user = await prisma.users.findFirst({
		where: {
			id: parseInt(req.params.id)
		}
	})

	res.json(user);
})

app.post('/users', async (req, res) => {
	const user = await prisma.users.create({
		data: req.body
	})

	res.json(user)
})

app.patch('/users/:id', async (req, res) => {
	const user = await prisma.users.update({
		where: {
			id: parseInt(req.params.id)
		},
		data: req.body
	});

	res.json(user);
})

app.delete('/users/:id', async (req, res) => {
	await prisma.users.delete({
		where: {
			id: parseInt(req.params.id)
		}
	})

	res.json({
		message: 'Nice'
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
