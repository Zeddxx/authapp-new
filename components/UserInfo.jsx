"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function UserInfo(){
  const {data: session} = useSession();

  return (
    <div className="grid h-screen place-items-center">
    <div className="shadow-xl rounded gap-4 p-8 bg-zinc-300/30 flex flex-col items-center">
        <h2>User Name: <span className='font-bold'>{session?.user?.name}</span></h2>
        <h2>User Email: <span className='font-bold'>{session?.user?.email}</span></h2>
        <button onClick={() => signOut()} className='bg-red-500 rounded text-white py-2 w-full'>Log Out</button>
    </div>
</div>
  )
}

