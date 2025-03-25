'use client'
import Image from "next/image";
import Link from "next/link";
import Top from "@/components/top";
import { useRouter } from 'next/navigation'
import {useAuth} from '../../context/history'
import { useState, useEffect } from "react";

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser, addOrder, addPickupOrder, pickupOrders} = useAuth()
  const [location, setLocation] = useState(0)
  const [orders, confirm] = useState([
    {location:'Cape town, south africa', orders: []},
    {location:'Nairobi, kenya', orders: []},
    {location:'Arusha, Tanzania', orders: []},
    {location:'dar es salam, Tanzania', orders: []}
  ])
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
        if (pickupOrders) {
            confirm(pickupOrders)
        }
      }, [])
  return (
      <main style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
        <section style={{display:'flex',height:'100vh'}}>
        <section style={{height:'100%',width:'20%'}}>
            {orders.map((o, ind) => <p onClick={()=>setLocation(ind)}>{o.location}</p>)}
        </section>
        <section style={{height:'100%',flex:1}}>
            <h1>{orders[location].location}</h1>
            {orders[location].orders.map((o, inner) => <div onClick={()=>confirm(orders.map((or, i) => i == location ? {location: or.location, orders: or.orders.map((ord, inn) => inn == inner ? {...ord, status: 'input'} : ord)} : or))}>
                <p>name: {o.name}</p>
                <p>date: {o.date}</p>
                <p>status: {o.status}</p>
                {o.status == 'confirmed' ? <p>amount: {o.amount}</p> : o.status == 'input' ? <input type="text"
                autofucus={true}
        name="amount"
        placeholder="amount"
        value={o.amount}
        onChange={e=>confirm(orders.map((or, i) => i == location ? {location: or.location, orders: or.orders.map((ord, inn) => inn == inner ? {...ord, amount: e.target.value} : ord)} : or))}
        
        onBlur={()=>confirm(orders.map((or, i) => i == location ? {location: or.location, orders: or.orders.map((ord, inn) => inn == inner ? {...ord, status: 'confirmed'} : ord)} : or))}/> : null}
            </div>)}
        </section>
        </section>
          <footer style={{width:'100%'}}>
          <div style={{width:'100%',display:'flex',justifyContent:'space-evenly', alignItems:'center'}}>
          <Image src="/no_white.png" width={96} height={96}/>
            <p>@2024 Toopi Organics. All rights reserved.</p>
          </div>
        </footer>
      </main>
  );
}
