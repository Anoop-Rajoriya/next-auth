import jwt from "jsonwebtoken";
import connectDB from "@/database/connectDB";
import User from "@/database/models/user";
import ApiResponse from "@/utils/ApiResponse";
import { cookies } from "next/headers";

export async function GET(req) {
  const cookieStore = await cookies();
  await connectDB();
  try {
    const cookie = cookieStore.get("authToken");

    if (!cookie || !cookie.value) return ApiResponse.error("Not authenticated");

    const decode = jwt.verify(cookie.value, process.env.JWT_SECERET);

    const user = await User.findOne({
      _id: decode.id,
      email: decode.email,
    }).select("-password");

    if (!user) {
      return ApiResponse.error("User not found", {}, 404);
    }

    return ApiResponse.success("Current user", user);
  } catch (error) {
    console.log("Me route error: ", error);
    return ApiResponse.error("Server internal error", {}, 500);
  }
}
