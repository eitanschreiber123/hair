"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams  } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useAuth } from "../../context/history";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'
  const {users, activeUser, signUp, login, logout, updateUser} = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
      throw new Error("Invalid email or password")
    } else {
      login(email, password)
      router.push(from || "/");
    }
  };
  return (
    <div className={styles.page}>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <input
        type="email"
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
      <button onClick={handleLogin}>Login</button>
    </div>
    <p>Dont have an account <Link href={from ? `/sign?from=${from}` : "/sign"}>sign up</Link></p>
      </main>
    </div>
  );
}
