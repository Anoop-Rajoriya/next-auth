import connectDB from "@/database/connectDB";
import User from "@/database/models/user";
import ApiResponse from "@/utils/ApiResponse";
import { decodeToken } from "@/utils/token";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password, confirmPassword } = await req.json();

    const decode = decodeToken(token);
    if (!decode || !decode.id) {
      return ApiResponse.error("Invalid token");
    }
    await connectDB();
    const user = await User.findOne({ _id: decode.id });
    if (!user) {
      return ApiResponse.error("Invalid token");
    }

    if (
      !user.resetPasswordToken.token ||
      user.resetPasswordToken.token !== token
    ) {
      return ApiResponse.error("Invalid token");
    }

    if (user.resetPasswordToken.expiry < new Date()) {
      return ApiResponse.error("Token expired");
    }

    if (password !== confirmPassword) {
      return ApiResponse.error("Password not match");
    }
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return ApiResponse.error("Password must be different to previous");
    }

    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS));
    const passHash = await bcrypt.hash(password, salt);

    user.password = passHash;
    user.resetPasswordToken = { token: "", expiry: null };
    await user.save();

    return ApiResponse.success("Password successfully updated");
  } catch (error) {
    console.error("password update route: ", error);
    return ApiResponse.error("Server internal error: ", {}, 500);
  }
}
