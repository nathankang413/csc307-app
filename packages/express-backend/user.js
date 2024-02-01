import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		job: {
			type: String,
			required: true,
			trim: true,
			validate(value) {
				if (value.length < 2) {
					throw new Error(
						"Invalid job, must be at least 2 characters."
					);
				}
			},
		},
	},
	{ collection: "users_list" }
);

const User = mongoose.Model("User", userSchema);

export default User;
