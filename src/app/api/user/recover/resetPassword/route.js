import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const email = reqBody["email"];
    const otp = reqBody["otp"];
    const password = reqBody["password"];
    const prisma = new PrismaClient();

    const count = await prisma.users.count({
      where: {
        email: email,
        otp: otp,
      },
    });

    if (count === 1) {
      const result = await prisma.users.update({
        where: {
          email: email,
        },
        data: { otp: "0", password: password },
      });

      return NextResponse.json({
        status: "Success",
        data: "Password Reset Successfully!",
      });
    } else {
      return NextResponse.json({ status: "Fail", data: "Invaild User" });
    }
  } catch (e) {
    return NextResponse.json({ status: "Fail", data: e });
  }
}
