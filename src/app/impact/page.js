'use client'
import Image from "next/image";
import Link from "next/link";
import Top from "@/components/top";
import { useRouter } from 'next/navigation'
import {useAuth} from '../../context/history'

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser, addOrder, cart} = useAuth()
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
      <main style={{ display: 'flex',flexDirection: 'column',width:'100vw',alignItems:'center',height:'100vh'}}>
        <Top image="people" first="Cut off recycle"second="A locally-sourced renewable resource for agriculture"  whichLink={()=>redirect()} amount={cart.one.hair +cart.one.liquid+cart.sub.weekly.hair +cart.sub.weekly.liquid+cart.sub.monthly.hair +cart.sub.monthly.liquid}/>
        <h1>Our impact</h1>
        <h1>Coming soon</h1>
        <footer style={{width:'100%'}}>
          <hr />
          <div style={{width:'100%',display:'flex',justifyContent:'space-evenly', alignItems:'center'}}>
          <Image src="/no_white.png" width={96} height={96}/>
            <p>@2024 Toopi Organics. All rights reserved.</p>
          </div>
        </footer>
      </main>
  );
}
