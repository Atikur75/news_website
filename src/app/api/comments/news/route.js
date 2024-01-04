import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function GET(req, res) {

    try {

        const {searchParams} = new URL(req.url);
        const postID = parseInt(searchParams.get("postID"));

        const prisma = new PrismaClient();

        const result = await prisma.comments.findMany({
            where : {postID : postID},
            include : {
                users : {
                    select : {
                        firstName : true,
                        lastName : true
                    }
                },
            }
        })

        return NextResponse.json({status : "Success", data : result});
    }catch (e) {
        return NextResponse.json({status : "Fail", data : e})
    }

}