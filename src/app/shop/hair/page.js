'use client'
import Image from "next/image";
import Link from "next/link";
import Top from "@/components/top";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const [cart, setCart] = useState({ hair: 0, liquid: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = item => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [item]: prevCart[item] + 1,
      };
      router.push("/cart");
      return updatedCart;
    });
  };
  return (
    <main style={{display: 'flex',flexDirection: 'column',width:'100vw'}}>
    <Top image="hair" first="Our products"whichLink={()=>redirect()}/>
    <section style={{display:'flex',flexWrap:'wrap'}}>
    <img alt="im" width="480" height="480" src="/hair_product.png"/>
      <div>
      <h1>Nutrified Organic Soil</h1>
      <h1>USD 0.20</h1>
      <button style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>addItem('hair')}>Add to cart</button>
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
