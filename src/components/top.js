'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from "react";
const Top = ({image, first, second, secondLink, amount}) => {
  const [see, change] = useState('transparent')
  const [behind, setBehind] = useState('transparent')
  const [space, setSpace] = useState('50px')
  const [wwidth, setWidth] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [z, setZ] = useState(10)
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        window.pageYOffset
        if (window.pageYOffset > 490) {
          change('black')
          setSpace(0)
          setBehind('white')
        } else {
          change('transparent')
          setSpace('50px')
          setBehind('transparent')
        }
      }
      window.addEventListener('scroll', handleResize);
      handleResize();
      return () => window.removeEventListener('scroll', handleResize);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
    return <section style={{backgroundImage:`url(/${image}.png)`, backgroundRepeat:'no-repeat', backgroundPosition:'center',backgroundSize:'cover', display:'flex',flexDirection:'column', height:'95vh',marginBottom:'50px', alignItems:'center',justifyContent:'center',width:'100%'}}>
          {/* Sidebar (Hidden by Default) */}
        {wwidth > 820 ? (
          <div className={styles.wr} style={{width:'100%',display:'flex',justifyContent:'space-between',position:'fixed',marginTop:space, padding:'0 20px',top:0,backgroundColor:see,alignItems:'center'}}>
          <Image alt="top" src="/no_white.png" style={{borderRadius:'50px',backgroundColor:behind}} width={96} height={96}/>
          <div style={{display:'flex'}}>
            <Link style={{fontSize:'1.5em',color:'white'}} href="/about">About us</Link>
            <Link style={{fontSize:'1.5em',color:'white',cursor:'pointer'}} href="/send">Barber Portal</Link>
            <p style={{fontSize:'1.5em',color:'white',cursor:'pointer'}} onClick={()=>secondLink()}>Employee Portal</p>
            <Link style={{fontSize:'1.5em',color:'white'}} href="/shop">Our products</Link>
            <Link style={{fontSize:'1.5em',color:'white'}} href="/impact">Our impact</Link>
            <Link style={{fontSize:'1.5em',color:'white'}} href="/contact">Contact</Link>
            <div style={{display:'flex',alignItems:'center'}} onClick={()=>router.push("/cart")}>
              <svg width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="white"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <span style={{borderRadius:'50px',backgroundColor:'white',color:'black',padding:'2px'}}>{amount}</span>
            </div>
          </div>
        </div>
        ) : (
          <>
            <svg 
              onClick={() => {
                setSidebarOpen(true)
                setZ(5)
              }} 
              style={{ cursor: 'pointer', zIndex: z, margin:'20px',position: 'fixed',top: '0px',left: '0px'}} 
              viewBox="0 0 50 45" width="50" height="50">
              <rect width="50" height="5"></rect>
              <rect y="20" width="50" height="5"></rect>
              <rect y="40" width="50" height="5"></rect>
            </svg>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
              <div 
                style={{ 
                  position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9 
                }} 
                onClick={() => {
                  setSidebarOpen(false)
                  setZ(10)
                }}
              >
                <div 
                  style={{
                    position: 'fixed', top: 0, left: 0, height: '100vh', width: '40vw',
                    backgroundColor: '#fff', padding: '20px', boxShadow: '2px 0px 10px rgba(0,0,0,0.2)'
                  }} 
                  onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside sidebar
                >
                  <div>
          <Image src="/no_white.png" width={96} height={96}/>
          <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
            <Link style={{fontSize:'1.5em',margin:'20px 0'}} href="/about">About us</Link>
            <Link style={{fontSize:'1.5em',color:'white',cursor:'pointer'}} href="/send">Barber Portal</Link>
            <p style={{fontSize:'1.5em',cursor:'pointer',margin:'20px 0'}} onClick={()=>secondLink()}>Employee Portal</p>
            <Link style={{fontSize:'1.5em',margin:'20px 0'}} href="/shop">Our products</Link>
            <Link style={{fontSize:'1.5em',margin:'20px 0'}} href="/impact">Our impact</Link>
            <Link style={{fontSize:'1.5em',margin:'20px 0'}} href="/contact">Contact</Link>
            <div style={{display:'flex',alignItems:'center'}} onClick={()=>router.push("/cart")}>
              <svg width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="white"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <span style={{borderRadius:'50px',backgroundColor:'white',color:'black',padding:'2px'}}>{amount}</span>
            </div>
          </div>
        </div>
                </div>
              </div>
            )}
          </>
        )}
    <h1 style={{alignSelf:'center', fontSize:'3em',color:'white',textAlign:'center'}}>{first}</h1>
    {second && <p style={{alignSelf:'center', fontSize:'1.5em',color:'white',textAlign:'center'}}>{second}</p>}
  </section>
}
export default Top