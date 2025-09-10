import { NextResponse } from "next/server";

export default class ApiResponse {
  static success(message, data = {}, status = 200) {
    return NextResponse.json({ success: true, message, data }, { status });
  }

  static error(message, errors = {}, status = 400) {
    return NextResponse.json({ success: false, message, errors }, { status });
  }
}
