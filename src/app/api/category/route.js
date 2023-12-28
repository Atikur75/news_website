import {NextResponse} from "next/server";

export async function POST(req,res) {

    try{
        return NextResponse.json({status : "Success", data : "Category created successfully!"});
    }catch (e) {
        return NextResponse.json({status : "Fail", data : e});
    }

}