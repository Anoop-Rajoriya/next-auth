import User from "@/database/models/user";
import connectDB from "@/database/connectDB";
import ApiResponse from "@/utils/ApiResponse";
import { decodeToken } from "@/utils/token";

export async function POST(req) {
  await connectDB();
  try {
    const { token } = await req.json();

    const decode = decodeToken(token);

    const user = await User.findOne({ _id: decode?.id });

    if (!user) {
      return ApiResponse.error("Invalid verification token");
    }

    if (user.isVarified) {
      return ApiResponse.error("User already verified", {}, 410);
    }

    if (
      !user.verificationToken?.token ||
      user.verificationToken?.token !== token
    ) {
      return ApiResponse.error("Invalid verification token");
    }

    if (user.verificationToken.expiry < new Date()) {
      return ApiResponse.error("Verification token expired");
    }

    user.isVarified = true;
    user.verificationToken = { token: "", expiry: undefined };
    await user.save();

    return ApiResponse.success("User verificaiton successful");
  } catch (error) {
    console.error("Verify-account error: ", error);
    return ApiResponse.error("Server internal error: ", {}, 500);
  }
}
