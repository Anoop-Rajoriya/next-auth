import bcrypt from "bcryptjs";

import ApiResponse from "@/utils/ApiResponse";
import { validateUser } from "@/utils/validaters";
import connectDB from "@/database/connectDB";
import User from "@/database/models/user";

export async function POST(req) {
  const { name, email, password } = await req.json();
  await connectDB();
  try {
    // user validation
    const { isValid, errors } = validateUser(
      { name, email, password },
      "signup"
    );
    if (!isValid) {
      return ApiResponse.error("Invalid form fields", errors);
    }

    // user existance
    const userExists = await User.findOne({ email });
    if (userExists) {
      return ApiResponse.error(
        "User already exists",
        {
          email: "Email address exists",
        },
        409
      );
    }

    // user password hashing
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS));
    const passHash = await bcrypt.hash(password, salt);

    // user creation
    const user = await User.create({ name, email, password: passHash });

    if (!user) {
      return ApiResponse.error("Failed to create user");
    }

    return ApiResponse.success("User signUp successfully");
  } catch (error) {
    console.error("Register Route Error: ", error);
    return ApiResponse.error("Server internal Error", {}, 500);
  }
}
