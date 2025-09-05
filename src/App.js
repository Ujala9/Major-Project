import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
// import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import HomePage from "./pages/HomePage";
import ElectroContext from "./Context/ElectroContext";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/Productdetails";
import Cart from "./pages/Cart";
import { useState, useEffect } from "react";
import useFetch from "./Components/useFetch";
import UserLogin from "./pages/userLogin";
import UserRegisterForm from "./pages/newUser";
import UserInfo from "./pages/userINfo";
import AddressPage from "./pages/AddressBook";
import WishlistManagement from "./pages/wishlist";
import OrderSummary from "./pages/createSummary"

import { ToastContainer,toast } from "react-toastify";

export default function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [cartId, setCartId] = useState(() => {
    let id = localStorage.getItem("cartId");
    if (!id) {
      id = "test123"; // Or generate dynamically: `id = Date.now().toString();`
      localStorage.setItem("cartId", id);
    }
    return id;
  });

  const {
    data: ProductData,
    loading: productLoading,
    error: productError,
  } = useFetch("https://e-commerce-products-zeta.vercel.app");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  
  const wishlistHandler = (productId) => {
    setWishlist(
      (prevWishlist) =>{
        if (prevWishlist.includes(productId)) {
        toast.error("Removed from Wishlist", { toastId: "wishlist-remove" });
        return prevWishlist.filter((id) => id !== productId);
      } else {
        toast.success("Added to Wishlist", { toastId: "wishlist-add" });
        return [...prevWishlist, productId];
      }
    });
  };

  //Remove from Whishlist
 

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  


  if (productLoading) return <p className="m-4">Loading...</p>;
  if (productError) return <p>Something went wrong!</p>;
  if (!ProductData) return null; // or some fallback UI

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => item.product._id === product._id);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ product, quantity: 1 });
    }
  
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    toast.info(`${product.name} Added to Cart`, {
      style: {background: "dark", color: "#ffffff", fontWeight: "bold" }
    })
  };
    

  
  // Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== productId)
    );
    toast.warning("Product Removed from Cart");
  };

  //move to wishlist
  const moveToWishlist = (cartItem) => {
    const product = cartItem.product; 
  
    
  setWishlist((prevWishlist) => {
    if (prevWishlist.includes(product._id)) return prevWishlist;
    return [...prevWishlist, product._id]; // store ID only
  });

    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== product._id)
    );
  
    toast.success("Moved to wishlist ❤️");
  };

  //increase quantity
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    toast.success("Quantity increased")
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
  let message = "";

  setCart((prevCart) =>
    prevCart.flatMap((item) => {
      if (item.product._id === productId) {
        if (item.quantity > 1) {
          message = "Quantity Decreased";
          return { ...item, quantity: item.quantity - 1 };
        } else {
          message = "Product Removed from Cart";
          return []; // remove item
        }
      }
      return item;
    })
  );

  if (message) {
    toast.warning(message, {
      style: { background: "dark" }
    });
  }
};


  

  return (
    <ElectroContext.Provider
      value={{
        addToCart,
        cart,
        setCart,
        removeFromCart,
        wishlistHandler,
        removeFromWishlist,
        increaseQuantity,
        decreaseQuantity,
        wishlist,
        ProductData,
        query,setQuery,
        moveToWishlist,
        selectedAddress,
        setSelectedAddress
      }}
    >
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<UserLogin />} />
          <Route path="/register" element={<UserRegisterForm />} />
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/address" element={<AddressPage/>} />
          <Route path="/wishlist" element={<WishlistManagement />} />
          <Route path="/order" element={<OrderSummary />} />
           
        </Routes>
        
          <ToastContainer theme="dark" autoClose={2000}/>
      </BrowserRouter>
    </ElectroContext.Provider>
  );
}
