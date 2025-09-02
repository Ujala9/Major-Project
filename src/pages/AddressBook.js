import { useState, useEffect } from "react";
const navigate = useNavigate();

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
  const handleSubmit = (e) => {
    e.preventDefault();

    let updated;
    if (editIndex !== null) {
      updated = addresses.map((addr, i) => (i === editIndex ? formData : addr));
      setEditIndex(null);
    } else {
      updated = [...addresses, formData];
    }
    setAddresses(updated);
    localStorage.setItem("addressList", JSON.stringify(updated));

    setFormData({
      name: "",
      phone: "",
      street: "",
      country: "",
      state: "",
      city: "",
    });
  };

  // Handle edit
  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditIndex(index);
  };

  // Handle delete
  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem("addressList", JSON.stringify(updated));
  };

  // Load stored addresses
  useEffect(() => {
    const stored = localStorage.getItem("addressList");
    if (stored) setAddresses(JSON.parse(stored));
  }, []);

  const handleCheckout = () => {
    if (selectedAddress === null) {
      alert("Please select an address first!");
      return;
    }
    const chosenAddress = addresses[selectedAddress];
    localStorage.setItem("chosenAddress", JSON.stringify(chosenAddress));
    navigate("/order-summary");
  };


  return (
    <div className="container mt-4">
      <h2>{editIndex !== null ? "Edit Address" : "Add New Address"}</h2>

      {/* One Form for All Inputs */}
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-6">
          <h5 className="text-info">Contact Information</h5>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <h5 className="text-info">Address</h5>
          <div className="mb-3">
            <label className="form-label">Street</label>
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
        </div>
      </form>

      <h4 className="mt-4">Saved Addresses</h4>
      <div className="row">
        {addresses.map((addr, index) => (
          <div key={index} className="col-md-5 mx-4 card my-3">
            <div className="card-body">
              <h5 className="card-title">{addr.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {addr.phone}
              </h6>
              <p className="card-text">
                {addr.street}, {addr.city}, {addr.state}, {addr.country}
              </p>
              <button
                className="btn btn-sm btn-link"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-link text-danger"
                onClick={() => handleDelete(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {addresses.length > 0 && (
        <button className="btn btn-success mt-3" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default AddressPage;
