import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ElectroContext from "../Context/ElectroContext";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(ElectroContext); 
  const [chosenAddress, setChosenAddress] = useState(null);

  useEffect(() => {
    const storedAddress = localStorage.getItem("chosenAddress");
    if (storedAddress) {
      setChosenAddress(JSON.parse(storedAddress));
    }
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );



  const handlePlaceOrder = () => {
    // alert("Order Placed Successfully!");
    toast.success("🎉 Order Placed Successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
    setCart([]); 
    localStorage.removeItem("chosenAddress");

    setTimeout(() => {
      navigate("/");
    }, 2000); 
  };

  if (!chosenAddress) {
    return <h3 className="text-center mt-5">No address selected!</h3>;
  }

  return (
    <div className="container mt-4">
      <h2>Order Summary</h2>

      {/* Address Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Delivery Address</h5>
          <p>
            <strong>{chosenAddress.name}</strong> <br />
            {chosenAddress.street}, {chosenAddress.city},{" "}
            {chosenAddress.state}, {chosenAddress.country} <br />
            Phone: {chosenAddress.phone}
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <h4>Your Items</h4>
      {cart.map((item, idx) => (
        <div key={item.product._id} className="card mb-2">
          <div className="card-body d-flex justify-content-between">
            <div>
              <h6>{item.product.name}</h6>
              <p>Quantity: {item.quantity}</p>
            </div>
            <p>₹{item.product.price * item.quantity}</p>
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="d-flex justify-content-between mt-3">
        <h5>Total:</h5>
        <h5>₹{totalPrice}</h5>
      </div>

      {/* Place Order Button */}
      <button className="btn btn-success mt-4 w-100" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
