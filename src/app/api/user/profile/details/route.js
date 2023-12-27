import { NextResponse } from "next/server";
import {headers} from "next/headers";
import {PrismaClient} from "@prisma/client";

export async function GET(req, res) {
  try {

    const headerList = headers();
    const id = parseInt(headerList.get("id"));
    const prisma = new PrismaClient();
    const result = await prisma.users.findUnique({where:{id : id}});
    return NextResponse.json({status : "Success", data : result})
  } catch (e) {
    return NextResponse.json({ status: "Fail", data: e });
  }
}
