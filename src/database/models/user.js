const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "full name required"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      token: String,
      expiry: Date,
    },
    verificationToken: {
      token: String,
      expiry: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
