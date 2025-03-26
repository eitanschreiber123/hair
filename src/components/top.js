'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useRef, useState, useEffect } from "react";
const Top = ({image, first, second, whichLink}) => {
  const [see, change] = useState('transparent')
  const [wwidth, setWidth] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [z, setZ] = useState(10)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        window.pageYOffset
        if (window.pageYOffset > 490) {
          change('black')
        } else {
          change('transparent')
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
          <div className={styles.wr} style={{width:'100%',display:'flex',justifyContent:'space-between',position:'fixed',marginTop:'50px', padding:'0 20px',top:0,backgroundColor:see}}>
          <Image src="/no_white.png" width={96} height={96}/>
          <div style={{display:'flex'}}>
            <Link style={{fontSize:'1.5em',color:'white'}} href="/about">About us</Link>
            <p style={{fontSize:'1.5em',color:'white',cursor:'pointer'}} onClick={()=>whichLink()}>Barber Portal</p>
            <Link style={{fontSize:'1.5em',color:'white'}} href="/employee">Employee Portal</Link>
            <Link style={{fontSize:'1.5em',color:'white'}} href="/shop">Our products</Link>
            <Link style={{fontSize:'1.5em',color:'white'}} href="/impact">Our impact</Link>
            <Link style={{fontSize:'1.5em',color:'white'}} href="/contact">Contact</Link>
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
            <p style={{fontSize:'1.5em',cursor:'pointer',margin:'20px 0'}} onClick={()=>whichLink()}>Barber Portal</p>
            <Link style={{fontSize:'1.5em',margin:'20px 0'}} href="/employee">Employee Portal</Link>
            <Link style={{fontSize:'1.5em',margin:'20px 0'}} href="/shop">Our products</Link>
            <Link style={{fontSize:'1.5em',margin:'20px 0'}} href="/impact">Our impact</Link>
            <Link style={{fontSize:'1.5em',margin:'20px 0'}} href="/contact">Contact</Link>
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