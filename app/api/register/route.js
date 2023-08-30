import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { User } from "@/models/user";

export async function POST(req){
    try{
        const { name,email,password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB();

        await User.create({name, email, password: hashedPassword})


        return NextResponse.json({message: "User Registered.", status: 201});
    }catch(error){
        return NextResponse.json({message: "error while registering the user!", status: 401});
    }
}