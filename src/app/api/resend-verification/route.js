import connectDB from "@/database/connectDB";
import User from "@/database/models/user";
import ApiResponse from "@/utils/ApiResponse";
import sendMail from "@/utils/mailer";
import { createToken } from "@/utils/token";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return ApiResponse.error("User not registred");
    }
    if (user.isVarified) {
      return ApiResponse.error("User already verified");
    }

    const verificationToken = createToken({ id: user._id });
    user.verificationToken = verificationToken;
    await user.save();

    await sendMail({
      to: user.email,
      subject: "Account Verification",
      text: "Click link to verify your account",
      html: `<a href="http:${process.env.DOMAIN}/verify-account/${user.verificationToken.token}">Verify Account</a>`,
    });

    return ApiResponse.success("Verification token resend");
  } catch (error) {
    console.error("Resend verification error: ", error);
    return ApiResponse.error("Server internal error", {}, 500);
  }
}
