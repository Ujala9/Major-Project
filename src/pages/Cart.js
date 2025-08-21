import { useEffect,useContext, useMemo } from "react";
import ElectroContext from "../Context/ElectroContext";

const Cart = () => {
  const { cart,removeFromCart, increaseQuantity,decreaseQuantity, moveToWishlist} = useContext(ElectroContext);

  console.log(cart);

  const { totalPrice, totalItems } = useMemo(() => {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((product) => {
      const price = product.product?.price || 0;
      const qty = product.quantity || 1;
      totalPrice += price * qty;
      totalItems += qty;
    });

    return { totalPrice, totalItems };
  }, [cart]);
  
   

  return (
    <>
      <section className="container">
        <h4 className="text-center py-2 mb-3">My Cart ({cart.length})</h4>
        <div className="row">
          <div className="col">
            {cart?.map((product) => (
              <div className="card my-3">
                <div className="row g-0">
                  <div className="col">
                    <img src={product.product.image} alt={product.product.name} width="200" height="280" />
                  </div>
                  <div class="col">
                    <div className="card-body">
                      <h4>{product.product.name}</h4>
                      <p className="fw-bold">{product.product.price}</p>

                      <div className="d-flex align-items-center mb-2">
                        <span className="me-2">Quantity:</span>
                        <button className="btn rounded btn-outline-danger btn-sm mx-1"
                        onClick={() => decreaseQuantity(product.product._id)}>
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button className="btn rounded btn-outline-info btn-sm mx-1"
                        onClick={() => increaseQuantity(product.product._id)}>
                          +
                        </button>
                      </div>

                      <div class="d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-secondary" type="button"
                        onClick={() => removeFromCart(product.product._id)}>
                          Remove from Cart
                        </button>
                        <button className="btn btn-info" type="button"
                        onClick={() => moveToWishlist(product)}>
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col mx-2">
            <h3>Price Details</h3>
            <hr />
            <p>Price ({totalItems} items): ₹{totalPrice}</p>
          <p>Delivery Charges: <strong>FREE</strong></p>
          <hr />
          <h5>Total Amount: ₹{totalPrice}</h5>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
