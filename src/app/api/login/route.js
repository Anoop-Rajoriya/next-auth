import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import ApiResponse from "@/utils/ApiResponse";
import { validateUser } from "@/utils/validaters";
import User from "@/database/models/user";
import connectDB from "@/database/connectDB";

export async function POST(req) {
  const { email, password } = await req.json();
  const cookieStore = await cookies();
  await connectDB();
  try {
    // validate user
    const { isValid, errors } = validateUser({ email, password });
    if (!isValid) {
      return ApiResponse.error("Invalide fields", errors);
    }
    // check user existance
    const user = await User.findOne({ email });
    if (!user) {
      return ApiResponse.error("User not exists", {}, 404);
    }
    // match password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return ApiResponse.error("Invalid password or email");
    }

    // verification check
    if (!user.isVarified) {
      return ApiResponse.error("Account not verified, check your email inbox");
    }
    // generate accessToken
    const authToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECERET
    );

    cookieStore.set({
      name: "authToken",
      value: authToken,
      maxAge: 7 * 24 * 60 * 60,
    });

    // send response
    return ApiResponse.success("Login successful");
  } catch (error) {
    console.error("Login route error: ", error);
    return ApiResponse.error("Server internal error", {}, 500);
  }
}
