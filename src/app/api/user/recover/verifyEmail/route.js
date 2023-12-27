import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SendMail } from "@/utility/EmailUtility";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const count = await prisma.users.count({
      where: {
        email: email,
      },
    });

    if (count === 1) {
      let code = Math.floor(100000 + Math.random() * 900000);
      let EmailText = `Your OTP Code is : ${code}`;
      let EmailSubject = "News Portal Verification Code";
      await SendMail(email, EmailText, EmailSubject);

      let result = await prisma.users.update({
        where: { email: email },
        data: { otp: code.toString() },
      });

      return NextResponse.json({ status: "success", data: result });
    } else {
      return NextResponse.json({ status: "Fail USER", data: "User not found" });
    }


    // return NextResponse.json({ status: "Success", data: count });
  } catch (e) {
    return NextResponse.json({ status: "Fail DSF", data: e });
  }
}
