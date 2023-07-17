import { NextRequest, NextResponse } from "next/server";

/**
 * @param { NextRequest } req
 * @returns { NextResponse } レスポンス
 */
export async function GET(req: NextRequest) {
  const res = NextResponse.json({}, { status: 200 });
  return res;
}
