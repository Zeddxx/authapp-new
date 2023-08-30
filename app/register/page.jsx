import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../api/auth/[...nextauth]/route";


export default async function Register(){
    const session = await getServerSession(authOption);

    if(session) redirect("/dashboard");
    return(
        <RegisterForm />
    )
}