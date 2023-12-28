import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function GET(req, res) {

    try {

        const {searchParams} = new URL(req.url);

        const type = searchParams.get("type");

        const prisma = new PrismaClient();

        const result = await prisma.policies.findMany({
            where : {type:type}
        })

        return NextResponse.json({status : "Success", data : result})
    }catch (e) {
        return NextResponse.json({status : "Fail", data : e})
    }

}