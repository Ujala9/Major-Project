import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    country: "",
    state: "",
    city: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const updated = [...addresses, formData];
  //   setAddresses(updated);
  //   localStorage.setItem("addressList", JSON.stringify(updated));
  //   setFormData({
  //     name: "",
  //     phone: "",
  //     street: "",
  //     country: "",
  //     state: "",
  //     city: "",
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updated;
    if (editIndex !== null) {
      // Editing an existing address
      updated = addresses.map((addr, index) =>
        index === editIndex ? formData : addr
      );
      setEditIndex(null);
    } else {
      // Adding new address
      updated = [...addresses, formData];
    }
    setAddresses(updated);
    localStorage.setItem("addressList", JSON.stringify(updated));

    // Reset form
    setFormData({
      name: "",
      phone: "",
      street: "",
      country: "",
      state: "",
      city: "",
    });
  };



// Handle edit button click
const handleEdit = (index) => {
  setFormData(addresses[index]);
  setEditIndex(index);
};

  useEffect(() => {
    const storedAddress = localStorage.getItem("addressList");

    if (storedAddress) {
      setAddresses(JSON.parse(storedAddress));
    }
  }, []);

  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem("addressList", JSON.stringify(updated));
  };

  // console.log(addresses)

  return (
    <div className="container mt-4">
      <h2>Add New Address</h2>

      <div className="row">
        <div className="col">
          <h5 className="text-info">CONTACT INFORMATION</h5>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your phone"
                required
              />
            </div>
          </form>
        </div>

        {/* Address Form */}
        <div className="col">
          <h5 className="text-info">ADDRESS</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Street Address</label>
              <input
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              {editIndex !== null ? "Update Address" : "Add Address"}
            </button>
          </form>
        </div>
      </div>

      <h4 className="mt-4">Saved Addresses</h4>
    
        <h5 className="text-info">Address</h5>
        <div className="row">
        {addresses.map((addr, index) => (
          <div className="col-md-5 mx-4 card my-3" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{addr.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {addr.phone}
              </h6>
              <span className="card-text">{addr.street},</span>
              <span className="card-text">{addr.city},</span>
              <p className="card-text">{addr.state}</p>
              <p className="card-text">{addr.country}</p>
              <Link  className="card-link" onClick={() => handleEdit(index)}>
                Edit
              </Link>
              <Link
                className="card-link text-danger"
                onClick={() => handleDelete(index)}
              >
                Remove
              </Link>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default AddressPage
