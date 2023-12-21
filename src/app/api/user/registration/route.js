import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function POST(req, res) {

    try {

        const reqData = await req.json();
        reqData.otp = "0";

        const prisma = new PrismaClient();

        const result = await prisma.users.create({
            data : reqData
        })

        return NextResponse.json({status : "success", data : result})

    }
    catch (e) {
        return NextResponse.json({status : "Fail", data : e})
    }

}