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
      <main style={{display: 'flex',flexDirection: 'column',width:'100vw'}}>
        <Top image="hair" first="Our products"whichLink={()=>redirect()} amount={cart.one.hair +cart.one.liquid+cart.sub.weekly.hair +cart.sub.weekly.liquid+cart.sub.monthly.hair +cart.sub.monthly.liquid}/>
        <section style={{display:'flex',width:'100%',justifyContent:'space-evenly',marginBottom:'50px',flexWrap:'wrap'}}>
          <div onClick={()=>router.push("/shop/hair")} style={{display:'flex',margin:'10px',flexDirection:'column',alignItems:'center',borderRadius:'10px',padding:'10px',border:'solid 1px black'}}>
          <img alt="im" width="264" height="264" src="/hair_product.png"/>
            <button style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Buy</button>
          </div>
          <div onClick={()=>router.push("/shop/liquid")} style={{display:'flex',margin:'10px',flexDirection:'column',alignItems:'center',borderRadius:'10px',padding:'10px',border:'solid 1px black'}}>
          <img alt="im" width="264" height="264" src="/liquid.png"/>
            <button style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Buy</button>
          </div>
        </section>
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
