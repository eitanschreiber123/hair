'use client'
import Image from "next/image";
import Link from "next/link";
import Top from "@/components/top";
import { useRouter } from 'next/navigation'
import {useAuth} from '../../context/history'
import { useState, useEffect } from "react";

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser, addOrder, addItemToCart, removeItemFromCart, cart} = useAuth()
  const [purchaseType, setPurchase] = useState('one')
  const [sub, setSub] = useState('weekly')
  const router = useRouter()
    const redirectCheckout = () => {
    if (!activeUser) {
      router.push("/sign?from=/checkout")
    }
    else {
      router.push("/checkout")
    }
  }
  return (
      <main>
        <Top image="hair" first="Cart"amount={cart.one.hair+cart.one.liquid+cart.sub.weekly.hair +cart.sub.weekly.liquid+cart.sub.monthly.hair +cart.sub.monthly.liquid}/>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        <button style={{backgroundColor:purchaseType == 'one'? '#4fad33' : 'white',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>setPurchase('one')}>One time purchase</button>
        <button style={{backgroundColor:purchaseType == 'sub'? '#4fad33' : 'white',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>setPurchase('sub')}>Subscription</button>
      </div>
      {
        purchaseType !== 'one' && <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        <button style={{backgroundColor:sub == 'weekly'? '#4fad33' : 'white',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>setSub('weekly')}>Weekly</button>
        <button style={{backgroundColor:sub == 'monthly'? '#4fad33' : 'white',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>setSub('monthly')}>Monthly</button>
      </div>
      }
      <section style={{display:'flex',justifyContent:'space-evenly'}}>
        <div>
          <img alt="im" width="480" height="480" src="/hair_product.png"/>
        <h1>hair
              <button onClick={()=>removeItemFromCart(purchaseType, 'hair', 1, sub)} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>-</button>
              <span>{purchaseType == 'one' ? cart.one.hair : cart.sub[sub].hair}</span>
              <button onClick={()=>addItemToCart(purchaseType, 'hair', 1, sub)} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>+</button>
              <h1>Price: {purchaseType == 'one' ? cart.one.hair * .2 : cart.sub[sub].hair * 2}$</h1>
              </h1>
              </div>
              <div>
                <img alt="im" width="480" height="480" src="/liquid.png"/>
              <h1>liquid
              <button onClick={()=>removeItemFromCart(purchaseType, 'liquid', 1, sub)} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>-</button>
              <span>{purchaseType == 'one' ? cart.one.liquid : cart.sub[sub].liquid}</span>
              <button onClick={()=>addItemToCart(purchaseType, 'liquid', 1, sub)} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>+</button>
              <h1>Price: {purchaseType == 'one' ? cart.one.liquid * 3.68 : cart.sub[sub].liquid * 3.68}$</h1>
              </h1>
              </div>
              </section>
              <h1>Total: {purchaseType == 'one' ? (cart.one.liquid * 3.68) + (cart.one.hair * .2) : (cart.sub[sub].liquid * 3.68) + (cart.sub[sub].hair * .2)}$</h1>
              <button style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em',border:'none'}} onClick={()=>router.push("/checkout")}>Checkout</button>
      </main>
  );
}
