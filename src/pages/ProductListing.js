import { useContext } from "react";
import ElectroContext from "../Context/ElectroContext";
import { useState } from "react";
import useFetch from "../Components/useFetch";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const [checkBox, setCheckBoxes] = useState([]);
  const [minRating, setRating] = useState(1);

  const [sortOrder, setSortOrder] = useState("");

  
  const { addToCart, wishlistHandler, wishlist,ProductData,query } =
    useContext(ElectroContext);

  
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useFetch("https://e-commerce-products-zeta.vercel.app/api/categories");

  // if (productLoading) return <p>Loading...</p>;
  // if (productError) return <p>Something went wrong!</p>;
  

  if (categoryLoading) return <p>Loading Categories...</p>;
  if (categoryError) return <p>Failed to load categories!</p>;
  if (!categoryData) return null
  


    

  const handleCheckboxes = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckBoxes((prevValue) => [...prevValue, value]);
    } else {
      setCheckBoxes((prevValue) => prevValue.filter((id) => id !== value));
    }
  };

  // const filteredProducts =
  //   checkBox.length === 0 || minRating
  //     ? electronicsProducts
  //     : electronicsProducts.filter((product) =>
  //         checkBox.includes(product.category) && product.rating === minRating
  //       );


  const filteredProducts = ProductData.filter(
    (product) =>
      (checkBox.length === 0 || checkBox.includes(product.category.name)) &&
      Number(product.rating) >= minRating &&
      product.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAndSortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  const clearBtnHandler = () => {
    setCheckBoxes([]), setRating(1);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // console.log(
  //   "Product categories:",
  //   data.map((p) => p.category)
  // );
  console.log("Selected checkboxes:", checkBox);
  // console.log(
  //   "Ratings:",
  //   data.map((p) => typeof p.rating)
  // );
  console.log("Sample Product:", ProductData[0]);

  const sortedProducts = [...ProductData].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  console.log(ProductData);
  console.log(categoryData);

  return (
    <>
      <div className="row">
        <div className="col-md-3 my-3">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Filters</h4>
              <button
                className="btn btn-outline-info btn-sm"
                onClick={clearBtnHandler}
              >
                CLEAR ALL
              </button>
            </div>

            {categoryData.length > 0 &&
              categoryData.map((cat) => (
                <div key={cat._id}>
                  <input
                    className="form-check-input mx-3 py-2"
                    type="checkbox"
                    //id={`cat-${cat._id}`}
                    value={cat.name}
                    checked={checkBox.includes(cat.name)}
                    onChange={handleCheckboxes}
                  />

                  <label>{cat.name}</label>
                </div>
              ))}

            <div className="my-3">
              <label htmlFor="ratingRange" className="form-label">
                Minimum Rating: {minRating} ⭐
              </label>
              <input
                type="range"
                className="form-range"
                min="1"
                max="5"
                step="0.5"
                id="ratingRange"
                value={minRating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Sort by Price: </label>
              <select className="form-select" value={sortOrder} onChange={handleSortChange}>
                <option value=""> Default</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="container row">
              {filteredAndSortedProducts.map((product) => (
                <div className="col-md-4 my-4">
                  <div className="card h-100 position-relative">
                    <i
                      className={`bi ${
                        wishlist.includes(product._id)
                          ? "bi-suit-heart-fill"
                          : "bi-suit-heart"
                      } fs-3 text-info position-absolute top-0 end-0 m-2 fs-4`}
                      role="button"
                      title="Add to Wishlist"
                      onClick={() => wishlistHandler(product._id)}
                    ></i>

                    <Link to={`/products/${product._id}`}>
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt="..."
                         style={{ width: "282px", height: "250px" }}
                      />
                    </Link>

                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p>{product.price}</p>
                      <p>{product.rating}</p>
                    </div>
                    <button className="btn btn-info"
                     onClick={() => addToCart(product)} >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductListing;
