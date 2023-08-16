import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * @param { NextRequest } req
 * @returns { NextResponse } レスポンス
 */
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("JSON Web Token", token);
  const res = NextResponse.json({}, { status: 200 });
  return res;
}
