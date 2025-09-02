
import React, { useContext } from "react";
import ElectroContext from "../Context/ElectroContext";
import { Link } from "react-router-dom";

const WishlistManagement = () => {
  const { ProductData, addToCart, wishlist, wishlistHandler, removeFromWishlist } = useContext(ElectroContext);

 const wishlistProducts = ProductData.filter((product) =>
    wishlist.includes(product._id)
  );


  if (wishlistProducts.length === 0) {
    return <h3 className="text-center my-4">Your wishlist is empty</h3>;
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">My Wishlist</h2>
      <div className="row">
        {wishlistProducts.map((product) => (
          <div className="col-md-3 my-3" key={product._id}>
            <div className="card h-100 position-relative">
              <i
                className={`bi bi-suit-heart-fill fs-3 text-danger position-absolute top-0 end-0 m-2`}
                role="button"
                title="Remove from Wishlist"
                onClick={() => wishlistHandler(product._id)}
              ></i>

              <Link to={`/products/${product._id}`}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
              </Link>

              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="fw-bold">₹{product.price}</p>
              </div>

              <button
                className="btn btn-dark"
                onClick={() => { 
                    addToCart(product)
                    removeFromWishlist(product._id)
                }}
               
              >
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistManagement;
