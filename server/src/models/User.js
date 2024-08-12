import mongoose from "mongoose";

const authCodeSchema = new mongoose.Schema({
  iv: String,
  encryptedData: String,
  createdDateTime: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    auth_code: authCodeSchema,
    created_date: { type: Date, default: Date.now },
    expires_at: Date,
  },
  { collection: "UsersAuthCodes" }
);

export const User = mongoose.model("User", userSchema);
