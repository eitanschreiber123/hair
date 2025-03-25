import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
const Top = ({image, first, second, whichLink}) => {
    return <section style={{backgroundImage:`url(/${image}.png)`, backgroundRepeat:'no-repeat', backgroundPosition:'center',backgroundSize:'cover', display:'flex',flexDirection:'column', height:'95vh',marginBottom:'50px', alignItems:'center',justifyContent:'center',width:'100%'}}>
        <div className={styles.wr} style={{width:'100%',display:'flex',justifyContent:'space-between',position:'fixed',marginTop:'50px', padding:'0 20px',top:0}}>
            <Image src="/no_white.png" width={96} height={96}/>
            <div style={{display:'flex'}}>
              <Link style={{fontSize:'1.5em',color:'white'}} href="/about">About us</Link>
              <p style={{fontSize:'1.5em',color:'white',cursor:'pointer'}} onClick={()=>whichLink()}>Barber Portal</p>
              <p style={{fontSize:'1.5em',color:'white',cursor:'pointer'}}>Employee Portal</p>
              <Link style={{fontSize:'1.5em',color:'white'}} href="/shop">Our products</Link>
              <Link style={{fontSize:'1.5em',color:'white'}} href="/impact">Our impact</Link>
              <Link style={{fontSize:'1.5em',color:'white'}} href="/contact">Contact</Link>
            </div>
          </div>
    <h1 style={{alignSelf:'center', fontSize:'3em',color:'white',textAlign:'center'}}>{first}</h1>
    {second && <p style={{alignSelf:'center', fontSize:'1.5em',color:'white',textAlign:'center'}}>{second}</p>}
  </section>
}
export default Top