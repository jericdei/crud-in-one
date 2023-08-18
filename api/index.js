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

app.post('/users/:id', async (req, res) => {
	const user = await prisma.users.findOne({id: req.params});

	console.log(user);
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
