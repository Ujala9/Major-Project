import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ElectroContext from "../Context/ElectroContext";

const Nav = () => {
  const { cart, wishlist, setQuery } = useContext(ElectroContext);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info-subtle shadow-sm py-3">
      <div className="container-fluid">
        
        <NavLink className="navbar-brand text-primary fs-2 fw-bold px-2" to="/">
          ElectroShop
        </NavLink>

    
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3">

            <li className="nav-item">
              <NavLink
                className="nav-link active fw-medium fs-5 text-dark"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link fw-medium fs-5 text-dark"
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium fs-5 text-dark" to="/profile">
                Login
              </NavLink>
            </li>
          </ul>

          {/* Search Box */}
          <div className="d-flex align-items-center mx-3">
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearch}
              className="form-control rounded-pill px-3"
               style={{ minWidth: "220px" }}
            />
          </div>

        
          <div className="d-flex align-items-center flex-wrap justify-content-center gap-2 mt-2 mt-lg-0">

          
            <Link to="/cart" className="position-relative mx-3">
              <i className="bi bi-cart fs-3 text-dark"></i>
              {cart.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info"
                  style={{ fontSize: "0.7rem", transform: "translate(-40%, -30%)" }}
                >
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link to="/userInfo" className="mx-3">
              <i className="bi bi-person-square text-dark fs-3"></i>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="position-relative mx-3">
              <i className="bi bi-suit-heart text-dark fs-3"></i>
              {wishlist.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info"
                  style={{ fontSize: "0.7rem", transform: "translate(-40%, -30%)" }}
                >
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
