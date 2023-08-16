import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { container } from "@/server/di.config";
import { CreateParams } from "@/server/di.interface";
import { TYPES } from "@/server/di.types";
import { TaskController } from "@/server/interface/controller";

const controller = container.get<TaskController>(TYPES.TaskController);

/**
 * @param { NextRequest } req
 * @returns { NextResponse } レスポンス
 */
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("JSON Web Token", token);
  const { name, memo, deadline, finished_at }: CreateParams = await req.json();
  const task = await controller.create({ name, memo, deadline, finished_at });
  if (task) {
    return NextResponse.json(task, { status: 200 });
  } else {
    return NextResponse.json({}, { status: 500 });
  }
}
