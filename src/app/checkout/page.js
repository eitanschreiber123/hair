'use client'
import Image from "next/image";
import Link from "next/link";
import Top from "@/components/top";
import { useRouter } from 'next/navigation'
import {useAuth} from '../../context/history'
import { useState, useEffect } from "react";
import { set } from "mongoose";

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser, addOrder, addItemToCart, cart} = useAuth()
  const [mainContent, setContent] = useState('shipping')
  const [method, setMethod] = useState('card')
  const [summary, setSummary] = useState({})
  const [address, setAddress] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [isSame, setSame] = useState(false)
  const [crypto, setCrypto] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [exp, setExp] = useState('')
  const [code, setCode] = useState('')
  const [saved, saveCard] = useState(false)
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
        setSummary({
    one: {
        hair: {
            amount: null,
            price: null
        },
        liquid: {
            amount: null,
            price: null
        },
        price: null
    },
    sub: {
        weekly: {
        hair: {
            amount: null,
            price: null
        },
        liquid: {
            amount: null,
            price: null
        },
        price: null
    },
    monthly: {
        hair: {
            amount: null,
            price: null
        },
        liquid: {
            amount: null,
            price: null
        },
        price: null
    },
    price: null
    },
    price: null
})
    }, [])
    useEffect(() => {
        setMethod()
        setAddress()
        setCrypto()
        setCardNumber()
        setCardName()
        setExp()
        setCode()
    })
  return (
      <main>
        <Top image="hair" first="Checkout"whichLink={()=>redirect()} amount={cart.one.hair +cart.one.liquid+cart.sub.weekly.hair +cart.sub.weekly.liquid+cart.sub.monthly.hair +cart.sub.monthly.liquid}/>
        <h1>Checkout</h1>
        <div style={{outline:'none',color:'hsl(0 0% 45.1%)',padding:'.25rem',backgroundColor:'hsl(0 0% 96.1%)',borderRadius:'10px',justifyContent:'center',alignItems:'center',display:'grid',border:'none',gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',height:'2.5rem'}}>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setContent('shipping')}>shipping</button>
            <button style={{cursor:'pointer',border:'none'}} disabled={address == '' || (billingAddress == '' && isSame == false)}onClick={()=>setContent('payment')}>payment</button>
            <button style={{cursor:'pointer',border:'none'}} disabled={cardNumber == '' || cardName == '' || exp == '' || code == ''} onClick={()=>setContent('review')}>review</button>
        </div>
        <section>
                {mainContent == 'shipping' ? <div>
                    <h1>Shipping Information</h1>
                    <p>Shipping Address</p>
                    <input name="address" value={address} onChange={e => setAddress(e.target.value)}/>
                    <div>
                        <input type="checkbox" checked={isSame} onChange={e => setSame(e.target.checked)}/>
                        <p>Billing address is the same as shipping address</p>
                    </div>
                    <button>Continue to Payment</button>
                </div>
                : mainContent == 'payment' ? <div>
                    <h1>Payment Information</h1>
                    <p>Payment Method</p>
                    <div style={{outline:'none',color:'hsl(0 0% 45.1%)',padding:'.25rem',backgroundColor:'hsl(0 0% 96.1%)',borderRadius:'10px',justifyContent:'center',alignItems:'center',display:'grid',border:'none',gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',height:'2.5rem'}}>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setMethod('card')}>Card</button>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setMethod('paypal')}>Paypal</button>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setMethod('crypto')}>Crypto</button>
        </div>
        <div>
        <div>
            <p>Card Number</p>
            <input name="cardNumber" value={cardNumber} onChange={e => setCardNumber(e.target.value)}/>
        </div>
        <div>
            <p>Cardholder Name</p>
            <input name="cardName" value={cardName} onChange={e => setCardName(e.target.value)}/>
        </div>
        <div>
        <div>
            <p>Expiry Date</p>
            <input name="exp" value={exp} onChange={e => setExp(e.target.value)}/>
        </div>
        <div>
            <p>CVV</p>
            <input name="code" value={code} onChange={e => setCode(e.target.value)}/>
        </div>   
        </div>
        <div>
                        <input type="checkbox" checked={saved} onChange={e => saveCard(e.target.checked)}/>
                        <p>Save this card for future purchases</p>
                    </div>
                    </div>
                    <div style={{display:'flex'}}>
                        <button>Back to Shipping</button>
                        <button>Continue to Review</button>
                    </div>
                </div>
                : <div style={{display:'flex'}}> 
                    <div>
                        <h1>Shipping Details</h1>
                        <div></div>
                    </div>
                    <div>
                        <h1>Payment Details</h1>
                        <div>
                            <p></p>
                        </div>
                    </div>
                    <button>Back to Payment</button>
                </div>}
            <div style={{display:'flex',flexDirection:'column'}}>
               <h1>Order Summary</h1>
               <div style={{outline:'none',color:'hsl(0 0% 45.1%)',padding:'.25rem',backgroundColor:'hsl(0 0% 96.1%)',borderRadius:'10px',justifyContent:'center',alignItems:'center',display:'grid',border:'none',gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',height:'2.5rem'}}>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setSummary('one')}>One time</button>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setSummary('sub')}>Subscription</button>
            </div>
               {summary == 'one' ? <div></div>
               : <div></div>}
               <div>
                 <h1>Total:</h1>
                 <h1>$227.67</h1>
               </div>
               <button>Place order</button>
            </div>
        </section>
      </main>
  );
}
