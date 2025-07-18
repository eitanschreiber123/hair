'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Top from "@/components/top";
import {useAuth} from '../context/history'
import { useEffect, useState } from "react";
import Tanzania from "@/components/tanzania";

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser, addOrder, cart} = useAuth()
  const [videoWidth, setVideoWidth] = useState('640')
  const [wwidth, setWidth] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  useEffect(() => {
      if (wwidth < 640) {
        setVideoWidth(wwidth)
      } else {
        setVideoWidth('640')
      }
  }, [wwidth])
  return (
      <main className={styles.main}>
        <Top image="people" first="Cut off recycle"second="A locally-sourced renewable resource for agriculture" amount={cart.one.hair +cart.one.liquid+cart.sub.weekly.hair +cart.sub.weekly.liquid+cart.sub.monthly.hair +cart.sub.monthly.liquid}/>
        <article style={{alignSelf:'center',display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
          <h2 style={{fontSize:'3em', marginBottom:'20px',textAlign:'center'}}>Recycling and adding value to human hair</h2>
          <p style={{fontSize:'1.5em', marginBottom:'20px',textAlign:'center'}}>We collect and recycle human hair waste into organic fertilizers</p>
        </article>
        <div style={{display:'flex', alignSelf:'center', marginBottom:'50px',flexWrap:'wrap'}}>
            <Link style={{margin:'10px'}} href="https://www.linkedin.com/company/cutoffrecycle/">
            <svg width="50" height="50" viewBox="0 0 24 24">
            <path d="M4.425,1.671A2.738,2.738,0,0,0,1.5,4.4,2.71,2.71,0,0,0,4.369,7.128H4.4a2.734,2.734,0,1,0,.028-5.457ZM4.4,6.128H4.369a1.736,1.736,0,1,1,.056-3.457A1.737,1.737,0,1,1,4.4,6.128Z"></path>
            <path d="M6.541,8.431H2.253a.5.5,0,0,0-.5.5v12.9a.5.5,0,0,0,.5.5H6.541a.5.5,0,0,0,.5-.5V8.931A.5.5,0,0,0,6.541,8.431Zm-.5,12.9H2.753V9.431H6.041Z"></path>
            <path d="M17.064,8.128A4.691,4.691,0,0,0,13.7,9.362V8.931a.5.5,0,0,0-.5-.5H8.914a.5.5,0,0,0-.5.523c.053,1.183,0,12.756,0,12.873a.5.5,0,0,0,.5.5H13.2a.5.5,0,0,0,.5-.5v-7.2a2.749,2.749,0,0,1,.1-.86,1.869,1.869,0,0,1,1.737-1.254c.413,0,1.671,0,1.671,2.417v6.9a.5.5,0,0,0,.5.5H22a.5.5,0,0,0,.5-.5v-7.4C22.5,10.485,20.467,8.128,17.064,8.128Zm4.436,13.2H18.213v-6.4c0-2.973-1.673-3.417-2.671-3.417a2.83,2.83,0,0,0-2.664,1.878,3.253,3.253,0,0,0-.177,1.236v6.7H9.416c.009-2.058.04-9.654.009-11.9H12.7v1.328a.5.5,0,0,0,.92.272,3.769,3.769,0,0,1,3.443-1.9c2.819,0,4.436,1.934,4.436,5.305Z"></path></svg>
            </Link><Link style={{margin:'10px'}} href="https://instagram.com/cutoffrecycle">
            <svg width="50" height="50" viewBox="0 0 24 24">
            <path d="M21.938,7.71a7.329,7.329,0,0,0-.456-2.394,4.615,4.615,0,0,0-1.1-1.694,4.61,4.61,0,0,0-1.7-1.1,7.318,7.318,0,0,0-2.393-.456C15.185,2.012,14.817,2,12,2s-3.185.012-4.29.062a7.329,7.329,0,0,0-2.394.456,4.615,4.615,0,0,0-1.694,1.1,4.61,4.61,0,0,0-1.1,1.7A7.318,7.318,0,0,0,2.062,7.71C2.012,8.814,2,9.182,2,12s.012,3.186.062,4.29a7.329,7.329,0,0,0,.456,2.394,4.615,4.615,0,0,0,1.1,1.694,4.61,4.61,0,0,0,1.7,1.1,7.318,7.318,0,0,0,2.393.456c1.1.05,1.472.062,4.29.062s3.186-.012,4.29-.062a7.329,7.329,0,0,0,2.394-.456,4.9,4.9,0,0,0,2.8-2.8,7.318,7.318,0,0,0,.456-2.393c.05-1.1.062-1.472.062-4.29S21.988,8.814,21.938,7.71Zm-1,8.534a6.351,6.351,0,0,1-.388,2.077,3.9,3.9,0,0,1-2.228,2.229,6.363,6.363,0,0,1-2.078.388C15.159,20.988,14.8,21,12,21s-3.159-.012-4.244-.062a6.351,6.351,0,0,1-2.077-.388,3.627,3.627,0,0,1-1.35-.879,3.631,3.631,0,0,1-.879-1.349,6.363,6.363,0,0,1-.388-2.078C3.012,15.159,3,14.8,3,12s.012-3.159.062-4.244A6.351,6.351,0,0,1,3.45,5.679a3.627,3.627,0,0,1,.879-1.35A3.631,3.631,0,0,1,5.678,3.45a6.363,6.363,0,0,1,2.078-.388C8.842,3.012,9.205,3,12,3s3.158.012,4.244.062a6.351,6.351,0,0,1,2.077.388,3.627,3.627,0,0,1,1.35.879,3.631,3.631,0,0,1,.879,1.349,6.363,6.363,0,0,1,.388,2.078C20.988,8.841,21,9.2,21,12S20.988,15.159,20.938,16.244Z"></path>
            <path d="M17.581,5.467a.953.953,0,1,0,.952.952A.954.954,0,0,0,17.581,5.467Z"></path>
            <path d="M12,7.073A4.927,4.927,0,1,0,16.927,12,4.932,4.932,0,0,0,12,7.073Zm0,8.854A3.927,3.927,0,1,1,15.927,12,3.932,3.932,0,0,1,12,15.927Z"></path>
            </svg>
            </Link>
            <Link style={{margin:'10px'}} href="https://www.facebook.com/CutOffRecycle/">
            <svg width="50" height="50" viewBox="0 0 24 24">
            <path d="M23,12A11,11,0,1,0,10.279,22.865h0a11.08,11.08,0,0,0,3.436,0h0A10.952,10.952,0,0,0,23,12ZM10.859,21.935v-6.9a.5.5,0,0,0-.5-.5H8.193V12.5h2.166a.5.5,0,0,0,.5-.5V9.686c0-2.278,1.264-3.585,3.459-3.585a15.392,15.392,0,0,1,1.858.137V7.89h-.824l-.019,0a2,2,0,0,0-2.181,1.735,1.8,1.8,0,0,0-.011.4V12a.5.5,0,0,0,.5.5H15.97l-.312,2.035H13.641a.5.5,0,0,0-.5.5v6.9A10.124,10.124,0,0,1,10.859,21.935Zm3.282-.166V15.535h1.946a.5.5,0,0,0,.5-.425l.465-3.035a.5.5,0,0,0-.494-.575H14.141V10.016a1.267,1.267,0,0,1,.308-.821,1.218,1.218,0,0,1,.9-.3h1.324a.5.5,0,0,0,.5-.5V5.806a.5.5,0,0,0-.42-.494A16.661,16.661,0,0,0,14.325,5.1c-2.754,0-4.466,1.757-4.466,4.585V11.5H7.693a.5.5,0,0,0-.5.5v3.035a.5.5,0,0,0,.5.5H9.859v6.234a10,10,0,1,1,4.282,0Z"></path>
            </svg></Link>
            <Link style={{margin:'10px'}} href="https://api.whatsapp.com/send?phone=255742290884">
            <svg width="50" height="50" viewBox="0 0 24 24"><g>
            <path d="M18.8,14.634a1.361,1.361,0,0,0-.645-.477l-.165-.081c-.018-.009-1.845-.917-2.208-1.049a.983.983,0,0,0-1.3.349c-.177.266-.721.914-.918,1.2a.409.409,0,0,1-.125-.049c-.058-.028-.137-.063-.233-.105a7.636,7.636,0,0,1-2.2-1.387,12.737,12.737,0,0,1-1.683-2.008.766.766,0,0,1,.086-.093c.1-.1.223-.248.342-.392l.159-.191a2.247,2.247,0,0,0,.338-.538l.044-.09a1.064,1.064,0,0,0-.026-1c-.057-.116-.35-.835-.616-1.481L9.31,6.408a1.123,1.123,0,0,0-1.146-.849c-.192-.01-.412-.012-.63-.012a1.724,1.724,0,0,0-1.269.62A3.989,3.989,0,0,0,5.087,9.074a6.653,6.653,0,0,0,1.435,3.631,14.178,14.178,0,0,0,5.546,4.857,18.659,18.659,0,0,0,1.846.682,4.476,4.476,0,0,0,1.373.208,5.741,5.741,0,0,0,.84-.065,3.729,3.729,0,0,0,2.526-1.826,2.85,2.85,0,0,0,.142-1.927Zm-1.084,1.59A2.852,2.852,0,0,1,15.978,17.4a3.837,3.837,0,0,1-1.762-.107,17.989,17.989,0,0,1-1.752-.647,13.168,13.168,0,0,1-5.122-4.512l-.071-.1A5.548,5.548,0,0,1,6.087,9.074a3.06,3.06,0,0,1,.974-2.295.654.654,0,0,1,.473-.232c.2,0,.4,0,.579.011h0l.133-.01a.685.685,0,0,1,.139.244l.341.827c.279.68.592,1.438.647,1.548.04.079.033.091.026.1l-.048.1a1.323,1.323,0,0,1-.2.327L8.98,9.9c-.1.117-.19.234-.275.318a.957.957,0,0,0-.217,1.249,9.938,9.938,0,0,0,1.854,2.307,8.645,8.645,0,0,0,2.464,1.558c.076.034.138.06.184.083a.969.969,0,0,0,1.282-.2,9.857,9.857,0,0,0,.993-1.306,1,1,0,0,1,.17.051c.229.084,1.6.75,2.1,1l.177.087c.067.032.144.069.2.1A3.126,3.126,0,0,1,17.711,16.224Z"></path>
            <path d="M12,1A11,11,0,0,0,2.792,18.014l-.974,3.711a.5.5,0,0,0,.61.61l3.779-.991A11,11,0,1,0,12,1Zm0,21a9.961,9.961,0,0,1-5.437-1.614.493.493,0,0,0-.4-.064L3,21.151l.814-3.1a.5.5,0,0,0-.071-.41A10,10,0,1,1,12,22Z"></path>
            </g></svg></Link>
            <Link style={{margin:'10px'}} href="https://www.youtube.com/@cutoffrecycle"><svg width="50" height="50" viewBox="0 0 24 24">
            <path d="M12,20.55c-.3,0-7.279-.006-9.115-.5A3.375,3.375,0,0,1,.5,17.665,29.809,29.809,0,0,1,0,12,29.824,29.824,0,0,1,.5,6.334,3.375,3.375,0,0,1,2.885,3.948c1.836-.492,8.819-.5,9.115-.5s7.279.006,9.115.5A3.384,3.384,0,0,1,23.5,6.334,29.97,29.97,0,0,1,24,12a29.97,29.97,0,0,1-.5,5.666,3.384,3.384,0,0,1-2.388,2.386C19.279,20.544,12.3,20.55,12,20.55Zm0-16.1c-.072,0-7.146.006-8.857.464A2.377,2.377,0,0,0,1.464,6.593,29.566,29.566,0,0,0,1,12a29.566,29.566,0,0,0,.464,5.407,2.377,2.377,0,0,0,1.679,1.679c1.711.458,8.785.464,8.857.464s7.146-.006,8.857-.464a2.377,2.377,0,0,0,1.679-1.679A29.66,29.66,0,0,0,23,12a29.66,29.66,0,0,0-.464-5.407h0a2.377,2.377,0,0,0-1.679-1.679C19.146,4.456,12.071,4.45,12,4.45ZM9.7,15.95a.5.5,0,0,1-.5-.5V8.55a.5.5,0,0,1,.75-.433l5.975,3.45a.5.5,0,0,1,0,.866L9.95,15.883A.5.5,0,0,1,9.7,15.95Zm.5-6.534v5.168L14.675,12Z"></path>
            </svg></Link>
            <Link style={{margin:'10px'}} href="mailto:info@cutoffrecycle.co.tz"><svg width="50" height="50" viewBox="0 0 24 24">
            <path d="M18.821,20.5H5.179A3.683,3.683,0,0,1,1.5,16.821V7.179A3.683,3.683,0,0,1,5.179,3.5H18.821A3.683,3.683,0,0,1,22.5,7.179v9.642A3.683,3.683,0,0,1,18.821,20.5ZM5.179,4.5A2.682,2.682,0,0,0,2.5,7.179v9.642A2.682,2.682,0,0,0,5.179,19.5H18.821A2.682,2.682,0,0,0,21.5,16.821V7.179A2.682,2.682,0,0,0,18.821,4.5Z"></path>
            <path d="M12,14.209a.5.5,0,0,1-.346-.138L4.286,7.028a.5.5,0,0,1,.691-.723L12,13.018l7.023-6.713a.5.5,0,1,1,.691.723l-7.368,7.043A.5.5,0,0,1,12,14.209Z"></path>
            <path d="M4.7,17.833a.5.5,0,0,1-.347-.86l5.54-5.31a.5.5,0,0,1,.692.722L5.048,17.694A.5.5,0,0,1,4.7,17.833Z"></path>
            <path d="M19.3,17.832a.5.5,0,0,1-.346-.139l-5.538-5.308a.5.5,0,0,1,.692-.722l5.538,5.308a.5.5,0,0,1-.346.861Z"></path>
            </svg></Link></div>
      <div style={{alignSelf:'center', display:'flex',width:'100%',justifyContent:'space-evenly', marginBottom:'50px',flexWrap:'wrap'}}>
          <Link style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em',margin:'10px'}} href="/shop">Shop</Link>
          <Link href="/send" style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em', border:'none',margin:'10px'}}>Send in hair</Link>
          <Link style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em',margin:'10px'}} href="https://invest.somoafrica.org/public/2659/CUTOFF%20RECYCLE%20LIMITED">Invest</Link>
        </div>
        <section style={{alignItems:'center',display:'flex',flexDirection:'column'}}>
          <h1>Intro</h1>
          <iframe frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="Jakaya Mrisho Kikwete Foundation - Kijana Leo Season 02 Episode 001" width={videoWidth} height="360" src="https://www.youtube.com/embed/vy1xCaAFMXY?autoplay=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=1&amp;forigin=http%3A%2F%2Flocalhost%3A3000%2F&amp;aoriginsup=1&amp;vf=6"></iframe>
          <h1>Articles</h1>
          <Link href="https://www.nationalgeographic.com/environment/article/recycle-human-hair-oil-spills-fertilizer" className={styles.box}>
            <img alt="im" width="48" height="48" src="/square.png"/>
            <p>"Your hair is surprisingly recyclable" - National Geographic Environment</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical h-5 w-5 text-gray-400"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </Link>
          <Link href="https://issuu.com/landmarine/docs/paa_102_precision-air/18" className={styles.box}>
            <img alt="im" width="48" height="48" src="/logo_green.png"/>
            <p>Inflight Magazine Feature - Paa by Precision Air</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical h-5 w-5 text-gray-400"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </Link>
          <Link href="https://www.thecitizen.co.tz/tanzania/magazines/success/-from-school-project-to-fully-fledged-business-3301092?fbclid=IwAR0GFcPZcQ_n_RRJwGydV9WTUBKSzmxIBV3SOkSXEdTshqdMFwALvY6gzVE" className={styles.box}>
            <img alt="im" width="48" height="48" src="/science.png"/>
            <p>From school project to fully-fledged business - The Citizen</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical h-5 w-5 text-gray-400"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </Link>
          <h1>Video Features</h1>
          <Link href="https://youtu.be/vy1xCaAFMXY?feature=shared" className={styles.box}>
            <img alt="im" width="48" height="48" src="/last_link.jpg"/>
            <p>The Award Winning KIJANA LEO TV Programme</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical h-5 w-5 text-gray-400"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </Link>
          <Link href="https://youtu.be/OAC87Te3SUU" className={styles.box}>
            <img alt="im" width="48" height="48" src="/woman.png"/>
            <p>As Seen on CGTN</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical h-5 w-5 text-gray-400"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </Link>
          <Link href="https://www.youtube.com/watch?v=qiWLCC6P2Yk" className={styles.box}>
            <img alt="im" width="48" height="48" src="/woman_leo.png"/>
            <p>As Seen on Voice Of America</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical h-5 w-5 text-gray-400"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </Link>
          <h1>Recognitions</h1>
          <Link href="https://www.facebook.com/share/p/1Fwvh1SspM/" className={styles.box}>
            <img alt="im" width="48" height="48" src="/logo_blue.png"/>
            <p>Westerwelle Foundation Entrepreneurship Supports</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical h-5 w-5 text-gray-400"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </Link>
          <Link href="https://anzishaprize.org/fellows/david-denis/#:~:text=David%20Denis%2C%20a%2022%2Dyear,Entrepreneurs'%20by%20the%20Anzisha%20Prize." className={styles.box}>
            <img alt="im" width="48" height="48" src="/logo_people.png"/>
            <p>Anzisha Prize</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical h-5 w-5 text-gray-400"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </Link>
        </section>
        <Tanzania />
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
