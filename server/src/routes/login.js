import { User } from "../models/User.js";

export function loginHandler() {
  return async (req, res) => {
    console.log("loginHandler invoked");
    try {
      const { email } = req.body;

      let user = await User.findOne({ user_id: email });
      if (!user) {
        user = new User({ user_id: email });
        await user.save();
      }

      //console.log("req.session:", req.session);

      //req.session.userId = user._id;
      res.send({ message: "Logged in successfully", user });
    } catch (error) {
      console.log("Error caught:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  };
}
