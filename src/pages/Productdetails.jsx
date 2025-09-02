// pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ElectroContext from "../Context/ElectroContext";
import useFetch from "../Components/useFetch";

const ProductDetails = () => {
  const { wishlistHandler, wishlist,addToCart } =
    useContext(ElectroContext);
  const { id } = useParams(); // 

  const { data, loading, error } = useFetch(
    "https://e-commerce-products-zeta.vercel.app/"
  );

  if (loading) return <p className="container my-5 fs-4 text-center">Loading...</p>;
  if (error) return <p>Something went wrong.</p>;



  const product = data?.find((item) => item._id === id);

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="row m-4">
      <div className="col my-3">
        <div className="position-relative">
          <i
            className={`bi ${wishlist.includes(product.id)
                ? "bi-suit-heart-fill"
                : "bi-suit-heart"
              } fs-3 text-info position-absolute top-0 end-0 fs-4`}
            role="button"
            title="Add to Wishlist"
            onClick={() => wishlistHandler(product.id)}
          ></i>
          <img className="container my-4"
            src={product.image}
            alt={product.title} style={{ maxHeight: "400px", objectFit: "contain" }} />
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary" type="button">Buy Now</button>
          <button className="btn btn-info" type="button" onClick={() => addToCart(product)}  >Add to Cart</button>
        </div>
      </div>

      <div className="col">
        <div className="container my-4 product-details">
          <h2>{product.title}</h2>
          <p><b>Brand: </b> {product.brand}</p>
          <p><b>Price: </b>₹{product.price}</p>
          <p><b>Rating: </b>{product.rating}</p>
          <p><b>Category: </b>{product.category.name}</p>
          <p><b>Description: </b>Experience innovation and reliability with this high-quality electronic product, designed to make your everyday life smarter, easier, and more efficient. Built with advanced technology and durable materials, it delivers powerful performance while maintaining a sleek, modern design. Whether you use it for work, study, or entertainment, this product ensures smooth functionality and user-friendly operation. Compact yet powerful, it fits seamlessly into your lifestyle, offering both style and convenience. A perfect balance of performance, durability, and value — made to keep up with your needs today and tomorrow.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
