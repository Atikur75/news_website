import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function POST(req, res) {

    try {

        const reqBody = await req.json();

        const prisma = new PrismaClient();

        const result = await prisma.subscribers.create({
            data : reqBody
        })

        return NextResponse.json({status : "Success", data : "Subscription completed!"})
    }catch (e) {
        return NextResponse.json({status : "Fail", data : e})
    }

}