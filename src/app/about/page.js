'use client'
import Image from "next/image";
import Link from "next/link";
import Top from "@/components/top";
import { useRouter } from 'next/navigation'
import {useAuth} from '../../context/history'

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser, addOrder} = useAuth()
    const router = useRouter()
      const redirect = () => {
        if (!activeUser) {
          router.push("/sign")
        }
        else {
          router.push("/send")
        }
      }
  return (
      <main>
        <Top image="people"first="About"  whichLink={()=>redirect()}/>
          <h1>About</h1>
          <h1>Coming soon</h1>
          <footer style={{width:'100%'}}>
          <div style={{width:'100%',display:'flex',justifyContent:'space-evenly', alignItems:'center'}}>
          <Image src="/no_white.png" width={96} height={96}/>
            <p>@2024 Toopi Organics. All rights reserved.</p>
          </div>
        </footer>
      </main>
  );
}
