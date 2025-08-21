import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ElectroContext from "../Context/ElectroContext";
import { useState } from "react";

const Nav = () => {
  const { cart,wishlist,setQuery } = useContext(ElectroContext);
 

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  }

    

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4 py-3 shadow-sm bg-info-subtle">
      <div className="container">
        <NavLink className="navbar-brand text-primary fs-2 fw-bold" to="/">
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
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarText"
        >
          <ul className="navbar-nav text-center  mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active fw-medium fs-4 text-dark"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link fw-medium fs-4 text-dark"
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium fs-4 text-dark" href="/Profile">
                  Login
              </a>
            </li>
          </ul>
          </div>
          <div className="flex items-center space-x-4">
        <input 
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        className="border rounded px-3 py-1 w-64 mx-5"
      />
      </div>
        <Link to="/cart" className="position-relative ms-auto d-inline-block">
          <i
            className="bi bi-cart fs-2 text-dark"
            style={{ lineHeight: 1 }}
          ></i>
          {cart.length > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info"
              style={{
                fontSize: "0.7rem",
                transform: "translate(-40%, -30%)",
              }}
            >
              {cart.length}
            </span>
          )}
        </Link>

        <Link to="/userInfo">
          <i className="bi bi-person-square text-dark mx-3 fs-3"></i>
        </Link>
        <Link to="/wishlist">
          <i className="bi bi-suit-heart text-dark mx-3 fs-3">
             <span  className="position-absolute translate-middle badge rounded-pill bg-info"
              style={{
                fontSize: "0.7rem",
                transform: "translate(-40%, -30%)"}}>{wishlist.length}</span>
          </i>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
