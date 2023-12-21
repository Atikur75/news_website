import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {CreateToken} from "@/utility/JWTTokenHelper";

export async function POST(req, res) {

    try {

        const reqBody = await req.json();

        const prisma = new PrismaClient();

        const result = await prisma.users.findUnique({
            where : reqBody
        })

        if(result.length===0){
            return NextResponse.json({status : "Fail length", data : result})
        }else {

            let token = await CreateToken(result["email"], result["id"]);
            let expireDuration = new Date(Date.now()+24*60*60*1000);
            const cookieString = `token=${token};expires=${expireDuration.toUTCString()};path=/`;

            return NextResponse.json({status : "Success", data : token},{status : 200,headers:{"set-cookie":cookieString}});
        }
    }
    catch (e) {
        return NextResponse.json({status : "Fail", data : e})
    }

}