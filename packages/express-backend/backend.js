import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

const generateUid = () => Math.trunc(Math.random() * 100000).toString();


// --- Controllers --- //
const findUserByName = (name) => {
    console.log(`Getting user by name: ${name}`)
    return users.users_list.filter(
        (user) => user.name === name
    );
};

const findUserById = (id) => {
    console.log(`Getting user by id: ${id}`)
    return users.users_list.find(
        (user) => user.id === id
    );
};

const addUser = (user) => {
    user.id = generateUid();

    console.log(`Adding user: ${user.id} ${user.name} ${user.job}`)
    users.users_list.push(user);
    return user;
}

const deleteUserById = (id) => {
    const index = users.users_list.findIndex(
        (user) => user.id === id
    )
    if (index >= 0) {
        console.log(`Removed user with id: ${id}`)
        users.users_list.splice(index, 1)
        return true
    }
    console.log(`Couldn't remove user id ${id}. Not found.`)
    return false
}

// --- Routes --- //
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const result = {user: addUser(userToAdd)};
    res.status(201).send(result);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id
    let result = deleteUserById(id)
    if (result) {
        res.status(204).send()
    } else {
        res.status(404).send("Resource not found.")
    }
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
