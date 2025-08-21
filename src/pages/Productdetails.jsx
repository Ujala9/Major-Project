// pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ElectroContext from "../Context/ElectroContext";
import useFetch from "../Components/useFetch";

const ProductDetails = () => {
    const { wishlistHandler, wishlist } =
    useContext(ElectroContext);  
  const { id } = useParams(); // 

  const { data, loading, error } = useFetch(
    "https://e-commerce-products-zeta.vercel.app/"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

 

  const product = data?.find((item) => item._id === id);

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="row">
      <div className="col">
      <div className="position-relative">
                    <i
                      className={`bi ${
                        wishlist.includes(product.id)
                          ? "bi-suit-heart-fill"
                          : "bi-suit-heart"
                      } fs-3 text-info position-absolute top-0 end-0 m-2 fs-4`}
                      role="button"
                      title="Add to Wishlist"
                      onClick={() => wishlistHandler(product.id)}
                    ></i>
        <img className="container my-4" 
        src={product.image} 
        alt={product.title}  style={{ maxHeight: "400px", objectFit: "contain" }} />
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-primary my-2 mx-4" type="button">Buy Now</button>
        <button className="btn btn-info" type="button" >Add to Cart</button>
        </div>
      </div>

      <div className="col">
        <div className="container my-4 product-details">
          <h2>{product.title}</h2>
          <p>Brand: {product.brand}</p>
          <p>Price: ₹{product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Category: {product.category.name}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
