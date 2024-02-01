import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
	.connect("mongodb://localhost:27017/users", {})
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
		promise = findUserByNameAndJob(name, job);
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

function findUserByNameAndJob(name, job) {
	return userModel.find({ name: name, job: job });
}

function addUser(user) {
	const userToAdd = new userModel(user);
	const promise = userToAdd.save();
	return promise;
}

function deleteUserById(id) {
	const promise = userModel.findByIdAndDelete(id);
	return promise;
}

export {
	getUsers,
	findUserById,
	findUserByName,
	findUserByJob,
	addUser,
	deleteUserById,
};
