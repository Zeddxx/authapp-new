"use client"

import Link from "next/link";
import {useState} from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm(){
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit= async(e) => {
        e.preventDefault();


        try{
            const res = await signIn('credentials', {
                email, password, redirect: false,
            });

            if(res.error){
                setError('Invalid Credentials.')
                return;
            }

            router.replace("dashboard");
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Enter the details</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Username"/>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password"/>
                    <button type="submit" className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'>Login</button>

                {error && (
                     <div className="bg-red-500 w-fit py-1 px-3 text-white rounded-md mt-2">{error}</div>
                )}
                <Link href={"/register"} className='text-sm mt-3 text-right'>
                    Don't Have an account? <span className='underline text-blue-400'>Register</span>
                </Link>
                </form>
            </div>
        </div>
    )
}