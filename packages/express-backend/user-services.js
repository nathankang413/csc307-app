import mongoose from "mongoose";
import userModel from "./user";

mongoose.set("debug", true);

mongoose
	.connect("mongo:db://localhost:27017/users", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => console.log(error));

function getUsers(name, job) {
	let promise;
	if (!name && !job) {
		promise = userModel.find();
	} else if (name && !job) {
		promise = findUserByName(name);
	} else if (!name && job) {
		promise = findUserByJob(job);
	} else {
		throw new Error("Cannot search by both name and job.");
	}
	return promise;
}

function findUserById(id) {
	return userModel.findById(id);
}

// helper for getUsers
function findUserByName(name) {
	return userModel.find({ name: name });
}

// helper for getUsers
function findUserByJob(job) {
	return userModel.find({ job: job });
}

function addUser(user) {
	const userToAdd = new userModel(user);
	const promise = userToAdd.save();
	return promise;
}

export default {
	getUsers,
	findUserById,
	findUserByName,
	findUserByJob,
	addUser,
};
