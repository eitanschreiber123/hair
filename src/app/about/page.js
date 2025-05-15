'use client'
import Image from "next/image";
import Link from "next/link";
import Top from "@/components/top";
import { useRouter } from 'next/navigation'
import {useAuth} from '../../context/history'
import styles from "./page.module.css";

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser, addOrder, cart} = useAuth()
    const router = useRouter()
      const redirect = () => {
        if (!activeUser) {
          router.push("/sign")
        }
        else {
          router.push("/send")
        }
      }
  return (
      <main style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
        <Top image="people"first="About"  whichLink={()=>redirect()} amount={cart.one.hair +cart.one.liquid+cart.sub.weekly.hair +cart.sub.weekly.liquid+cart.sub.monthly.hair +cart.sub.monthly.liquid}/>
          <h1>About</h1>
          <section style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
            <h1>Our story</h1>
            <article>In 2017, the human hair recycling innovation grew out of the school campus at The School of St. Jude Smith Campus while one of the founders, David Denis was having a routinely hair cut at the school hair salon. It was developed in various stages jointly with Ojung’u Jackson, a classmate and Mercy Alfayo, a laboratory technician with support from The School of St. Jude and was first publicly presented at the school’s annual science fair on 25th March 2018 where it grabbed a lot of attention and a second-place award. In the same year the project got validated through various competitions in the country from the Innovation Week at the Nelson Mandela African Institute of Science and Technology where it won 1st place for Secondary School Science Projects and then the nation-wide Young Scientists competition where it won 2nd place overall.</article>
            <article>After realizing commercial potential for the manufacturing of organic fertilizers, the project got commercialized in 2020 in Arusha City with routine human hair waste collection done in the streets of Arusha and manufacturing of organic fertilizers which were first supplied and studied by vegetable farmers in Arusha. This year the project got recognized for the prestigious African-wide Anzisha Prize.</article>
            <article>In 2021, the project partnered with the Arusha City Council to establish city-wide collection of human hair waste from barbershops and processing done at a material recovery facility at the Muriet Landfill. Between 2021 and 2023, the project established a collection network through a pilot in 3 wards of Arusha City using garbage trucks for collection of hair waste from barbershops and walk-in waste pickers who get paid per weight of hair waste collected.</article>
            <article>In 2024, CutOff Recycle Limited was incorporated under the Company Act of 2002 to conduct activities on waste management, manufacturing and providing agricultural support. With a Fertilizer Dealer License as a Manufacturer from the Tanzania Fertilizer Regulatory Authority, the company has also partnered with the Arusha Region’s Small Industries Development Organization (SIDO) for 3 years incubation getting dedicated support for business growth and manufacturing space. For the organic liquid fertilizer and nutrified organic growing medium. </article>
          </section>
          <section style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
            <h1>Our Vision</h1>
            <p>To create an environmentally sustainable world by fostering local solutions with a global impact.</p>
            <h1>Our Mission</h1>
            <p>To create an environmentally sustainable waste management solution that supports agricultural development and environmental conservation.</p>
            <h1>Our core values</h1>
            <ul>
            <li>Environmental Sustainability: Reducing environmental pollution by diverting human hair waste from landfills and improper disposal methods.</li>
            <li>Agricultural Improvement: Providing affordable and effective organic fertilizers to small-scale farmers to enhance soil health and crop yields.</li>
            <li>Economic Empowerment: Creating job opportunities for Tanzanian locals in various sectors related to waste management and organic fertilizer production.</li> 
            </ul>
          </section>
          <section style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
            <h1>Our Team</h1>
            <div className={styles.team} style={{display:'flex'}}>
            <div style={{flex:1}}>
              <Image src="/david.jpg" width={150} height={200}/>
              <p>David Denis</p>
              <p>Founder & CEO</p>
            </div>
            <div style={{flex:1}}>
              <Image src="/ojung.jpg" width={150} height={200}/>
              <p>Ojung’u Jackson</p>
              <p>Director & Chief od Strategy and Partnerships</p>
            </div>
            <div style={{flex:1}}s>
              <Image src="/mercy.jpeg" width={150} height={200}/>
              <p>Mercy Alfayo</p> 
              <p>Director & Research and Development Manager</p>
            </div>
            </div>
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
