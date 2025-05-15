'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/history';

export default function Home() {
  const { users, cart, activeUser, signUp, login, logout, updateUser, addOrder, addPickupOrder, pickupOrders, changeOrderStatus } = useAuth();
  const [location, setLocation] = useState(0);
  const [wwidth, setWidth] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [z, setZ] = useState(10)
  const [orders, confirm] = useState([]);
  const [filters, setFilters] = useState([
    {f:'pending', c:false},
    {f:'confirmed', c:false},
    {f:'sent', c:false},
    {f:'input', c:true}
  ])
  const [userFilters, setUserFilters] = useState([])

  const router = useRouter();

  const redirect = () => {
    if (!activeUser) {
      router.push("/sign");
    } else {
      router.push("/send");
    }
  };

  useEffect(() => {
    if (pickupOrders && pickupOrders.length > 0) {
      console.log(pickupOrders)
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
            <div>{pickupOrders.map((o, ind) => (
              <p key={ind} style={{ margin: '20px 0', cursor: 'pointer' }} onClick={() => 
              {
                setLocation(ind)
              setFilters([
                {f:'pending', c:false},
                {f:'confirmed', c:false},
                {f:'sent', c:false}
              ])
            }
              }>
                {o.location}
              </p>
            ))}</div>
            <div>
                    {users.map(u => <div style={{display:'flex'}}>
              <p>{u.name}</p>
            <input
        type="checkbox"
        name={u.name}
        checked={userFilters.includes(u.name)}
        onChange={()=>setUserFilters(!userFilters.includes(u.name) ? userFilters.concat(u.name) : userFilters.filter(us => us !== u.name))}/>
            </div>)}
                  </div>
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
                  <div>{orders.map((o, ind) => (
                    <p key={ind} style={{ margin: '20px 0', cursor: 'pointer' }} onClick={() => {
                      setLocation(ind);
                      setSidebarOpen(false);
                      setFilters([
                        {f:'pending', c:false},
                        {f:'confirmed', c:false},
                        {f:'sent', c:false}
                      ])
                      }}>
                      {o.location}
                    </p>
                  ))}</div>
                  <div>
                    {users.map(u => <div style={{display:'flex'}}>
              <p>{u.name}</p>
            <input
        type="checkbox"
        name={u.name}
        checked={userFilters.includes(u.name)}
        onChange={()=>setUserFilters(!userFilters.includes(u.name) ? userFilters.concat(u.name) : userFilters.filter(us => us !== u.name))}/>
            </div>)}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Main Content */}
        {pickupOrders[location] && pickupOrders[location].location && <section style={{ height: '100%', flex: 1 }}>
          <h1>{pickupOrders[location].location}</h1>
          <div style={{display:'flex',width:'100%',justifyContent:'space-evenly'}}>
            {filters.slice(0, 3).map((f, i) => <div style={{display:'flex'}}>
              <p>{f.f}</p>
            <input
        type="checkbox"
        name={f.f}
        checked={f.c}
        onChange={()=>setFilters(filters.map((fi, ind) => i == ind ? {f:f.f, c:!f.c} : fi))}      />
            </div>)}
          </div>
          {pickupOrders.map(({location,orders})=>({location,orders: orders.filter(order => userFilters.length == 0 ? order : userFilters.includes(order.name))}))[location].orders.filter(f => filters.slice(0, 3).filter(f => f.c == false).length == 3 ? f : filters.filter(f => f.c == true).map(f => f.f).includes(f.status)).map((o, inner) => (
            <div key={inner} onClick={() => changeOrderStatus(pickupOrders[location].location,o._id,'input')}>
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
                  onChange={e => changeOrderStatus(pickupOrders[location].location,o._id,o.status,e.target.value)}
                  onBlur={() => changeOrderStatus(pickupOrders[location].location,o._id,'confirmed',o.amount)}
                />
              ) : null}
            </div>
          ))}
        </section>}
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
