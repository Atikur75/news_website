import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function GET(req,res) {

    try{

        const prisma = new PrismaClient();

        const result = await prisma.categories.findMany();

        return NextResponse.json({status : "Success", msg : "Category created successfully!", data : result},);
    }catch (e) {
        return NextResponse.json({status : "Fail", data : e});
    }

}