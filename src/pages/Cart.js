import {  useContext, useMemo } from "react";
import ElectroContext from "../Context/ElectroContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, moveToWishlist } = useContext(ElectroContext);

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
            {cart.length === 0 ? (
              <h5 className="text-center my-5">🛒 Your cart is empty</h5>
            ) : (
              cart.map((product) => (
                <div className="card my-3" key={product.product._id}>
                  <div className="row g-0">
                    <div className="col">
                      <img
                        src={product.product.image}
                        alt={product.product.name}
                        width="200"
                        height="280"
                      />
                    </div>
                    <div className="col">
                      <div className="card-body">
                        <h4>{product.product.name}</h4>
                        <p className="fw-bold">₹{product.product.price}</p>

                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">Quantity:</span>
                          <button
                            className="btn rounded btn-outline-danger btn-sm m-2"
                            onClick={() => decreaseQuantity(product.product._id)}
                          >
                            -
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            className="btn rounded btn-outline-info btn-sm m-2"
                            onClick={() => increaseQuantity(product.product._id)}
                          >
                            +
                          </button>
                        </div>

                        <div className="d-flex gap-2 mt-4 ">
                          <button
                            className="btn btn-secondary text-light"
                            type="button"
                            onClick={() => removeFromCart(product.product._id)}
                          >
                            Remove from Cart
                          </button>
                          <button
                            className="btn btn-info text-light"
                            type="button"
                            onClick={() => moveToWishlist(product)}
                          >
                            Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="col mx-2">
              <h3>Price Details</h3>
              <hr />
              <p>Price ({totalItems} items): ₹{totalPrice}</p>
              <p>
                Delivery Charges: <strong>FREE</strong>
              </p>
              <hr />
              <h5>Total Amount: ₹{totalPrice}</h5>
              <Link to="/address">
                <button className="btn btn-dark col-6 my-4" type="button">
                  Place Order
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
