// context/history.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

// Provider component
export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [pickupOrders, setOrders] = useState([
    {location: 'Cape town, south africa', orders:[]},
    {location: 'Nairobi, kenya', orders:[]},
    {location: 'Arusha, tanzania', orders:[]},
    {location: 'Dar es salam, tanzania', orders:[]}
  ])
  const [activeUser, setActiveUser] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const storedActiveUser = localStorage.getItem("activeUser");

    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedActiveUser) setActiveUser(JSON.parse(storedActiveUser));

    const storedPickupOrders = localStorage.getItem("pickupOrders");
    if (storedPickupOrders) setUsers(JSON.parse(storedPickupOrders));
  }, []);

  // Save to localStorage on users or activeUser change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("activeUser", JSON.stringify(activeUser));
    localStorage.setItem("pickupOrders", JSON.stringify(pickupOrders));
  }, [users, activeUser, pickupOrders]);

  // Sign up a new user
  const signUp = (name, email, password) => {
    const userExists = users.find((user) => user.email === email);
    if (userExists) throw new Error("User already exists");

    const newUser = {
      name: name,
      email: email,
      password: password,
      orders: [],
      sub: null,
      address: "",
      info: "",
      payment: null,
      subPayment: null,
      subInfo:null,
      cart: {
        sub: {
          hair: 0,
          liquid: 0
        },
        one: {
          hair: 0,
          liquid: 0
        }
      },
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setActiveUser(newUser);
  };

  // Login an existing user
  const login = (email, password) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) throw new Error("Invalid email or password");

    setActiveUser(user);
  };

  // Logout
  const logout = () => {
    setActiveUser(null);
  };

  // Update active user’s properties
  const updateUser = (updates) => {
    if (!activeUser) return;

    const updatedUser = { ...activeUser, ...updates };
    setActiveUser(updatedUser);

    const updatedUsers = users.map((user) =>
      user.email === activeUser.email ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const addOrder = (order) => {
    if (!activeUser) return;

    const updatedOrders = [...activeUser.orders, order];
    updateUser({ orders: updatedOrders });
  };

  const addPickupOrder = order => {
    return 1
  }

  return (
    <AuthContext.Provider value={{ users, activeUser, signUp, login, logout, updateUser, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
