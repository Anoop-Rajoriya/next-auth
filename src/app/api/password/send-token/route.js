import connectDB from "@/database/connectDB";
import User from "@/database/models/user";
import ApiResponse from "@/utils/ApiResponse";
import { createToken } from "@/utils/token";
import sendMail from "@/utils/mailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return ApiResponse.error("User not registred");
    }

    if (
      user.resetPasswordToken.token &&
      user.resetPasswordToken.expiry > new Date()
    ) {
      return ApiResponse.error("Link already sended");
    }

    const token = createToken({ id: user._id });
    user.resetPasswordToken = token;
    await user.save();

    await sendMail({
      to: user.email,
      subject: "Password Recovery",
      text: "Click link to reset password",
      html: `<a href="http:${process.env.DOMAIN}/forget-password/${user.resetPasswordToken.token}">Reset Password</a>`,
    });

    return ApiResponse.success("Reset link sended to given email");
  } catch (error) {
    console.log("Password send token error: ", error);
    return ApiResponse.error("Server internal error", {}, 500);
  }
}
