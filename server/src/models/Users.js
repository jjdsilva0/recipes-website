import mongoose from "mongoose";

// A Schema is an object that defines the structure of the data
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes_list" }],
});

export const UserModel = mongoose.model("users", UserSchema);
