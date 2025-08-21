import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState();

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
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="container mx-3 my-4">
            <p>My Account</p>
            <Link to="/wishlist">
              <p>My Wishlist</p>
            </Link>
            <Link to="/cart">
              <p>My Cart</p>
            </Link>
            <Link to="/address">
              <p>My AddressBook</p>
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="my-2">My Account</h2>
          <h5 className="mt-2 text-success">Account Information</h5>
          <div class="card my-3">
            <div class="card-header">Contact Information</div>
            <div class="card-body">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <Link to="/register">edit</Link>
            </div>
          </div>

          <h5 className="my-2 text-success">Address Book</h5>
          <div className="row">
            {address.map((addr, index) => (
              <div
                className="col-md-5 mx-4 card my-3"
                style={{ width: "18rem" }}
              >
                <div class="card-header">Address</div>
                <div className="card-body">
                  <h5 className="card-title">{addr.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {addr.phone}
                  </h6>
                  <span className="card-text">{addr.street},</span>
                  <span className="card-text">{addr.city},</span>
                  <p className="card-text">{addr.state}</p>
                  <p className="card-text">{addr.country}</p>
                  <Link to="/address" className="card-link">
                    Edit Address
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
