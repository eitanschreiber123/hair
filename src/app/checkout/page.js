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
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [zip, setZip] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [isSame, setSame] = useState(false)
  const [crypto, setCrypto] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [exp, setExp] = useState('')
  const [code, setCode] = useState('')
  const [saved, saveCard] = useState(false)
  const [rightSide, setSide] = useState('one')
  const [paypal, setPaypal] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (!activeUser) {
      router.replace(`/sign?from=/checkout`)
    }
  }, [activeUser, router])
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
        <Top image="hair" first="Checkout"amount={cart.one.hair +cart.one.liquid+cart.sub.weekly.hair +cart.sub.weekly.liquid+cart.sub.monthly.hair +cart.sub.monthly.liquid}/>
        <h1>Checkout</h1>
        <section style={{display:'flex'}}>
            <div style={{flex:2}}>
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
                    <input name="country" value={country} onChange={e => setCountry(e.target.value)}/>
                    <input name="city" value={city} onChange={e => setCity(e.target.value)}/>
                    <input name="zip" value={zip} onChange={e => setZip(e.target.value)}/>
                    <div>
                        <input type="checkbox" checked={isSame} onChange={e => setSame(e.target.checked)}/>
                        <p>Billing address is the same as shipping address</p>
                    </div>
                    <button disabled={address == '' || (billingAddress == '' && isSame == false)}onClick={()=>setContent('payment')}>Continue to Payment</button>
                </div>
                : mainContent == 'payment' ? <div>
                    <h1>Payment Information</h1>
                    <p>Payment Method</p>
                    <div style={{outline:'none',color:'hsl(0 0% 45.1%)',padding:'.25rem',backgroundColor:'hsl(0 0% 96.1%)',borderRadius:'10px',justifyContent:'center',alignItems:'center',display:'grid',border:'none',gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',height:'2.5rem'}}>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setMethod('card')}>Card</button>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setMethod('paypal')}>Paypal</button>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setMethod('crypto')}>Crypto</button>
        </div>
        {method == 'card' ? <div>
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
                    : method == 'paypal' ? <div>
                        <p>Paypal account</p>
                        <input />
                        </div>
                        : <div>
                            <p>Bitcoin wallet address</p>
                        <input />
                            </div>}
                    <div style={{display:'flex'}}>
                        <button>Back to Shipping</button>
                        <button>Continue to Review</button>
                    </div>
                </div>
                : <div style={{display:'flex', flexDirection:'column'}}> 
                <div style={{display:'flex'}}>
                    <div>
                        <h1>Shipping Details</h1>
                        <div>
                            <p>{address}</p>
                            <p>{city},{zip}</p>
                            <p>{country}</p>
                        </div>
                    </div>
                    <div>
                        <h1>Payment Details</h1>
                        <div>
                          <p>{method == 'card' ? `Card ending in ${cardNumber.replace(/\D/g, '').slice(-4)}` : method == 'paypal' ? `Paypal account ${paypal}` : `Crypto wallet ${crypto}`}</p>
                        </div>
                    </div>
                    </div>
                    <button>Back to Payment</button>
                </div>}
                </section>
                </div>
            <div style={{display:'flex',flexDirection:'column',flex:1}}>
               <h1>Order Summary</h1>
               <div style={{outline:'none',color:'hsl(0 0% 45.1%)',padding:'.25rem',backgroundColor:'hsl(0 0% 96.1%)',borderRadius:'10px',justifyContent:'center',alignItems:'center',display:'grid',border:'none',gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',height:'2.5rem'}}>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setSide('one')}>One time</button>
            <button style={{cursor:'pointer',border:'none'}} onClick={()=>setSide('sub')}>Subscription</button>
            </div>
               {rightSide == 'one' ? <div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex'}}>
                    <Image width={40} height={40} src="/hair_product.png"/>
                    <p>Hair</p>
                    </div>
                    <div>
                        <p>qty: {cart.one.hair}</p>
                        <p>price: {cart.one.hair * .2}</p>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex'}}>
                    <Image width={40} height={40} src="/liquid.png"/>
                    <p>Liquid</p>
                    </div>
                    <div>
                        <p>qty: {cart.one.liquid}</p>
                        <p>price: {cart.one.liquid * 3.68}</p>
                    </div>
                </div>
               </div>
               : <div>
                  <div>
                    <h2>Weekly</h2>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{display:'flex'}}>
                    <Image width={40} height={40} src="/hair_product.png"/>
                    <p>Hair</p>
                    </div>
                    <div>
                        <p>qty: {cart.sub.weekly.hair}</p>
                        <p>price: {cart.sub.weekly.hair * .2}</p>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex'}}>
                    <Image width={40} height={40} src="/liquid.png"/>
                    <p>Liquid</p>
                    </div>
                    <div>
                        <p>qty: {cart.sub.weekly.liquid}</p>
                        <p>price: {cart.sub.weekly.liquid * 3.68}</p>
                    </div>
                </div>
                  </div>
                  <div>
                    <h2>Monthly</h2>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{display:'flex'}}>
                    <Image width={40} height={40} src="/hair_product.png"/>
                    <p>Hair</p>
                    </div>
                    <div>
                        <p>qty: {cart.sub.monthly.hair}</p>
                        <p>price: {cart.sub.monthly.hair * .2}</p>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex'}}>
                    <Image width={40} height={40} src="/liquid.png"/>
                    <p>Liquid</p>
                    </div>
                    <div>
                        <p>qty: {cart.sub.monthly.liquid}</p>
                        <p>price: {cart.sub.monthly.liquid * 3.68}</p>
                    </div>
                </div>
                  </div>
                </div>}
               <div style={{display:'flex',justifyContent:'space-between'}}>
                 <h1>Total:</h1>
                 <h1>${(cart.one.hair * .2) + (cart.one.liquid * 3.68) + (cart.sub.weekly.hair * .2) + (cart.sub.weekly.liquid * 3.68) + (cart.sub.monthly.hair * .2) + (cart.sub.monthly.liquid * 3.68)}</h1>
               </div>
               <button style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em',border:'none'}}>Place order</button>
            </div>
            </section>
      </main>
  );
}
