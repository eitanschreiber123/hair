'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/history';

export default function Home() {
  const { users, activeUser, signUp, login, logout, updateUser, addOrder, addPickupOrder, pickupOrders } = useAuth();
  const [location, setLocation] = useState(0);
  const [wwidth, setWidth] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [z, setZ] = useState(10)
  const [orders, confirm] = useState([
    { location: 'Cape town, South Africa', orders: [] },
    { location: 'Nairobi, Kenya', orders: [] },
    { location: 'Arusha, Tanzania', orders: [] },
    { location: 'Dar es Salaam, Tanzania', orders: [] }
  ]);

  const router = useRouter();

  const redirect = () => {
    if (!activeUser) {
      router.push("/sign");
    } else {
      router.push("/send");
    }
  };

  useEffect(() => {
    if (pickupOrders) {
      confirm(pickupOrders);
    }
  }, []);

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

  return (
    <main style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <section style={{ display: 'flex', height: '100vh', position: 'relative' }}>
        
        {/* Sidebar (Hidden by Default) */}
        {wwidth > 680 ? (
          <section style={{ height: '100%', width: '25%', padding: '10px' }}>
            {orders.map((o, ind) => (
              <p key={ind} style={{ margin: '20px 0', cursor: 'pointer' }} onClick={() => setLocation(ind)}>
                {o.location}
              </p>
            ))}
          </section>
        ) : (
          <>
            <svg 
              onClick={() => {
                setSidebarOpen(true)
                setZ(5)
              }} 
              style={{ cursor: 'pointer', zIndex: z, margin:'20px' }} 
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
                  {orders.map((o, ind) => (
                    <p key={ind} style={{ margin: '20px 0', cursor: 'pointer' }} onClick={() => { setLocation(ind); setSidebarOpen(false); }}>
                      {o.location}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Main Content */}
        <section style={{ height: '100%', flex: 1 }}>
          <h1>{orders[location].location}</h1>
          {orders[location].orders.map((o, inner) => (
            <div key={inner} onClick={() => confirm(orders.map((or, i) =>
              i === location ? { location: or.location, orders: or.orders.map((ord, inn) =>
                inn === inner ? { ...ord, status: 'input' } : ord
              ) } : or
            ))}>
              <p>name: {o.name}</p>
              <p>date: {o.date}</p>
              <p>status: {o.status}</p>
              {o.status === 'confirmed' ? (
                <p>amount: {o.amount}</p>
              ) : o.status === 'input' ? (
                <input
                  type="text"
                  autoFocus
                  name="amount"
                  placeholder="amount"
                  value={o.amount}
                  onChange={e => confirm(orders.map((or, i) =>
                    i === location ? { location: or.location, orders: or.orders.map((ord, inn) =>
                      inn === inner ? { ...ord, amount: e.target.value } : ord
                    ) } : or
                  ))}
                  onBlur={() => confirm(orders.map((or, i) =>
                    i === location ? { location: or.location, orders: or.orders.map((ord, inn) =>
                      inn === inner ? { ...ord, status: 'confirmed' } : ord
                    ) } : or
                  ))}
                />
              ) : null}
            </div>
          ))}
        </section>
      </section>

      {/* Footer */}
      <footer style={{ width: '100%' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Image src="/no_white.png" width={96} height={96} alt="Logo" />
          <p>@2024 Toopi Organics. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
