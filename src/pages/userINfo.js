import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    // Retrieve the stored user data from localStorage
    const storedUser = localStorage.getItem("userProfile");
    const storedAddress = localStorage.getItem("addressList");

    if (storedUser || storedAddress) {
      // Convert JSON string back to object
      setUser(JSON.parse(storedUser));
      setAddress(JSON.parse(storedAddress));
    }
  }, []);

  if (!user) {
    return <p>No user information found.</p>;
  }
  console.log(user);
  console.log(address);

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f9f9f9" }}>
  <div className="row">
    {/* Sidebar */}
    <div className="col-12 col-md-3 mb-4">
      <div className="p-3 bg-white shadow rounded">
        <p className="fw-bold mb-3">My Account</p>
        <Link to="/wishlist" className="d-block mb-2 text-decoration-none text-dark">
          ❤️ My Wishlist
        </Link>
        <Link to="/cart" className="d-block mb-2 text-decoration-none text-dark">
          🛒 My Cart
        </Link>
        <Link to="/address" className="d-block text-decoration-none text-dark">
          📍 My AddressBook
        </Link>
      </div>
    </div>

    {/* Content */}
    <div className="col-12 col-md-9">
      <h2 className="mb-4">My Account</h2>

      {/* Account Info */}
      <div className="mb-4">
        <h5 className="text-success mb-3">Account Information</h5>
        <div className="bg-white shadow rounded p-3">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <Link to="/register" className="text-primary">Edit</Link>
        </div>
      </div>

      {/* Address Book */}
      <div>
        <h5 className="text-success mb-3">Address Book</h5>
        <div className="row">
          {address && address.length > 0 ? (
            address.map((addr, index) => (
              <div key={index} className="col-12 col-sm-6 mb-4">
                <div className="bg-white shadow rounded p-3 h-100">
                  <h6 className="fw-bold">{addr.name}</h6>
                  <p className="mb-1">{addr.phone}</p>
                  <p className="mb-1">{addr.street}, {addr.city}</p>
                  <p className="mb-2">{addr.state}, {addr.country}</p>
                  <Link to="/address" className="text-primary">Edit Address</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No Address found</p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  )}
export default UserInfo;
