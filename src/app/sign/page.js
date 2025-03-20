"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useAuth } from "../../context/history";

export default function Home() {
  const {users, activeUser, signUp, login, logout, updateUser} = useAuth()
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => signUp(name, email, password)
  useEffect(() => {
    if (activeUser) {
      console.log(users, activeUser)
    router.push("/send")
    }
  }, [users])
  return (
    <div className={styles.page}>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{ padding: "20px" }}>
      <h1>Sign Up</h1>
      <input type="text"
        name="name"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
    <p>Already have an account <Link href="/login">log in</Link></p>
      </main>
    </div>
  );
}
