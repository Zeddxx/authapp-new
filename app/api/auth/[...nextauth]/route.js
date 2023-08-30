import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const authOption={
    providers: [
        CredentialsProvider({
            name:"credential",
            credential : {},

            async authorize(credentials){
                const {email, password} = credentials;
                 
                try{
                    await connectMongoDB();

                    const user = await User.findOne({email})

                    if(!user){
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(!passwordMatch) return null;
                    return user;

                }catch(err){
                    console.log(err);
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    secrect:process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };