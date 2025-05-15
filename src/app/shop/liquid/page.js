'use client'
import Image from "next/image";
import Link from "next/link";
import Top from "@/components/top";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import {useAuth} from '../../../context/history'

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser, addOrder, addItemToCart, cart} = useAuth()
  const [purchaseType, setType] = useState('one')
  const [sub, setSub] = useState('weekly')
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
    <section style={{display:'flex',flexWrap:'wrap'}}>
    <img alt="im" width="480" height="480" src="/liquid.png" style={{margin:'20px 0'}}/>
      <div>
      <h1>Amino Acid+ Crop Booster</h1>
      <h1 style={{margin:'0 20px'}}>USD 3.68</h1>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        <button style={{backgroundColor:purchaseType == 'one'? '#4fad33' : 'white',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>setType('one')}>One time purchase</button>
        <button style={{backgroundColor:purchaseType == 'sub'? '#4fad33' : 'white',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>setType('sub')}>Subscription</button>
      </div>
      {
        purchaseType !== 'one' && <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        <button style={{backgroundColor:sub == 'weekly'? '#4fad33' : 'white',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>setSub('weekly')}>Weekly</button>
        <button style={{backgroundColor:sub == 'monthly'? '#4fad33' : 'white',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>setSub('monthly')}>Monthly</button>
      </div>
      }
      <button style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>addItemToCart({ type: 'one', product: 'hair' }, cart.hair)}>Add to cart</button>
      </div>
    </section>
    <Link href="/cart">Go to cart</Link>
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
