import { cookies } from "next/headers";
import ApiResponse from "@/utils/ApiResponse";

export async function GET() {
  const cookieStore = await cookies();

  try {
    cookieStore.set({
      name: "authToken",
      value: "",
      secure: true,
      httpOnly: true,
    });

    return ApiResponse.success("User successfuly logout");
  } catch (error) {
    console.error("Logout route error: ", error);
    return ApiResponse.error("Server internal error", {}, 500);
  }
}
