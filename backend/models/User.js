import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// ✅ add static method
userSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email });
};

const User = mongoose.model("User", userSchema);

export default User;
