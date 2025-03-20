'use client'
import Image from "next/image";
import Link from "next/link";
import Top from "@/components/top";
import { useRouter } from 'next/navigation'
import {useAuth} from '../../context/history'
import { useState, useEffect } from "react";

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser, addOrder} = useAuth()
  const [cart, setCart] = useState({hair:0, liquid:0})
  const [price, setPrice] = useState({hair:null, liquid:null})
  const router = useRouter()
    const redirect = () => {
      if (!activeUser) {
        router.push("/sign")
      }
      else {
        router.push("/send")
      }
    }
    useEffect(() => {
      const storedItems = localStorage.getItem("cart");
      setCart(JSON.parse(storedItems))
    }, [])
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
      setPrice({hair: cart.hair * .2, liquid: cart.liquid * 3.68})
    }, [cart]);
  return (
      <main>
        <Top image="hair" first="Cart"whichLink={()=>redirect()}/>
        <h1>hair
              <button onClick={()=>setCart(prev => ({...prev,hair: Math.max(0, prev.hair - 1)}))} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>-</button>
              <span>{cart.hair}</span>
              <button onClick={()=>setCart(prev => ({...prev,hair: prev.hair + 1}))} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>+</button>
              <h1>Price: {price.hair}</h1>
              </h1>
              <h1>liquid
              <button onClick={()=>setCart(prev => ({...prev,liquid: Math.max(0, prev.liquid - 1)}))} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>-</button>
              <span>{cart.liquid}</span>
              <button onClick={()=>setCart(prev => ({...prev,liquid: prev.liquid + 1}))} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>+</button>
              <h1>Price: {price.liquid}</h1>
              </h1>
              <h1>Total: {price.hair + price.liquid}</h1>
              <Link style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} href="https://wa.link/9cd4j0">Checkout</Link>
      </main>
  );
}
