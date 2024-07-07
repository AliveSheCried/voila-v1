import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    auth_code: {
      iv: String,
      encryptedData: String,
    },
    created_date: { type: Date, default: Date.now },
    expires_at: Date,
  },
  { collection: "UsersAuthCodes" }
);

export const User = mongoose.model("User", userSchema);
