// context/history.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

// Provider component
export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [pickupOrders, setPickupOrders] = useState([])
  const [activeUser, setActiveUser] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const newData = async () => {
      const data = await fetch('http://localhost:3000/api/data')
  const users = await data.json()
  setUsers(users)
    }
    newData()
  }, [])
  useEffect(() => {
    const newData = async () => {
      const data = await fetch('http://localhost:3000/api/pickup')
  const users = await data.json()
  setPickupOrders(users)
    }
    newData()
  }, [])

  // Save to localStorage on users or activeUser change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("activeUser", JSON.stringify(activeUser));
    localStorage.setItem("pickupOrders", JSON.stringify(pickupOrders));
  }, [users, activeUser, pickupOrders]);

  // Sign up a new user
  const signUp = async (name, email, password) => {
    try {
      const userExists = users.find((user) => user.email === email);
      if (userExists) throw new Error("User already exists");
  
      const newUser = {
        name,
        email,
        password,
        orders: [],
        sub: null,
        address: "",
        info: "",
        payment: '',
        subPayment: '',
        subInfo: '',
        cart: {
          sub: {
            weekly: { hair: 0, liquid: 0 },
            monthly: { hair: 0, liquid: 0 }
          },
          one: {
            hair: 0,
            liquid: 0
          }
        }
      };
  
      const res = await fetch("/api/data", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
  
      if (!res.ok) throw new Error("Failed to register user");
  
      const savedUser = await res.json();
      setUsers([...users, savedUser]);
      setActiveUser(savedUser);
    } catch (err) {
      console.error("Signup Error:", err);
      throw err;
    }
  };
  
  // Login an existing user
  const login = async (email, password) => {
  try {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");

    // You might call an actual auth endpoint here in a real app
    setActiveUser(user);

    // Update active user in backend too (if needed)
    await fetch("/api/active", {
      method: "PUT",
      body: JSON.stringify({ user }),
    });
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};

  // Logout
  const logout = async () => {
    try {
      setActiveUser(null);
      await fetch("/api/active", {
        method: "PUT",
        body: JSON.stringify({ user: null }),
      });
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  // Update active user’s properties
  const updateUser = async (updates) => {
  if (!activeUser) return;

  try {
    const updatedUser = { ...activeUser, ...updates };

    const res = await fetch("/api/data", {
      method: "PUT",
      body: JSON.stringify(updatedUser),
    });

    if (!res.ok) throw new Error("Failed to update user");

    const savedUser = await res.json();
    setActiveUser(savedUser);

    const updatedUsers = users.map((user) =>
      user._id === savedUser._id ? savedUser : user
    );
    setUsers(updatedUsers);
  } catch (err) {
    console.error("Update User Error:", err);
  }
};

const addOrder = async (order) => {
  if (!activeUser) return;
  const updatedOrders = [...(activeUser.orders || []), order];
  await updateUser({ orders: updatedOrders });
  const res = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to register user");
};

const addPickupOrder = async (location, order) => {
  try {
    const res = await fetch("http://localhost:3000/api/pickup", {
      method: "PUT",
      body: JSON.stringify({ location, order }),
    });

    if (!res.ok) throw new Error("Failed to add pickup order");

    const updatedPickupOrder = await res.json();

    setPickupOrders((prev) =>
      prev.map((pickup) =>
        pickup.location.toLowerCase() === location.toLowerCase()
          ? updatedPickupOrder
          : pickup
      )
    );
  } catch (err) {
    console.error("Add Pickup Order Error:", err);
  }
};

const addItemToCart = async (item, quantity) => {
  if (!activeUser || !item || typeof quantity !== 'number') return;

  // Deep clone to avoid state mutation
  const updatedCart = JSON.parse(JSON.stringify(activeUser.cart || {
    sub: { weekly: { hair: 0, liquid: 0 }, monthly: { hair: 0, liquid: 0 } },
    one: { hair: 0, liquid: 0 }
  }));

  const { type, plan, product } = item;

  // Validate structure
  if (!['sub', 'one'].includes(type)) {
    console.error("Invalid cart type");
    return;
  }

  if (type === 'sub') {
    if (!['weekly', 'monthly'].includes(plan)) {
      console.error("Invalid sub plan");
      return;
    }
    if (!['hair', 'liquid'].includes(product)) {
      console.error("Invalid product type");
      return;
    }

    updatedCart.sub[plan][product] = (updatedCart.sub[plan][product] || 0) + quantity;
  } else if (type === 'one') {
    if (!['hair', 'liquid'].includes(product)) {
      console.error("Invalid product type");
      return;
    }
    updatedCart.one[product] = (updatedCart.one[product] || 0) + quantity;
  }

  // Save changes to backend
  await updateUser({ cart: updatedCart });
};

const changeOrderStatus = async (location, orderId, status, amount = undefined) => {
  try {
    if (!location || !orderId || !status) {
      throw new Error("Missing location, orderId, or status");
    }

    const payload = { location, orderId, status };
    if (amount !== undefined) {
      payload.amount = amount;
    }

    const res = await fetch("/api/pickup", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to update order status");
    }

    const updatedPickupOrder = await res.json();

    // Replace the updated pickupOrder in the state
    setPickupOrders((prevOrders) =>
      prevOrders.map((po) =>
        po.location.toLowerCase() === location.toLowerCase() ? updatedPickupOrder : po
      )
    );
  } catch (err) {
    console.error("Change Order Status Error:", err);
  }
};



  
  return (
    <AuthContext.Provider value={{ users, activeUser, signUp, login, logout, updateUser, addOrder, addPickupOrder, pickupOrders, addItemToCart, changeOrderStatus}}>
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
