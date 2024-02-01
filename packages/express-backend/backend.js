import express from "express";
import cors from "cors";
import {
	getUsers,
	findUserById,
	addUser,
	deleteUserById,
} from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/users", (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	getUsers(name, job)
		.then((result) => res.send({ users_list: result }))
		.catch((err) => res.status(500).send(err));
});

app.get("/users/:id", (req, res) => {
	const id = req.params.id;
	findUserById(id)
		.then((result) => res.send(result))
		.catch((err) => res.status(404).send(err));
});

app.post("/users", (req, res) => {
	const userToAdd = req.body;
	addUser(userToAdd)
		.then((result) => res.status(201).send({user: result}))
		.catch((err) => res.status(400).send(err));
});

app.delete("/users/:id", (req, res) => {
	const id = req.params.id;
	deleteUserById(id)
		.then((result) => res.status(204).send(result))
		.catch((err) => res.status(404).send(err));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
