import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const UserRegisterForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const updatedProfile = { ...profile, [e.target.name]: e.target.value };
  setProfile(updatedProfile);

  // save continuously
  localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));

    //Reset form
    setProfile({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };
  return (
    <>
      <h1 className="text-center py-5 bg-body-tertiary fw-bold">
        Customer Login
      </h1>
      <div className="container" style={{ maxWidth: "600px" }}>
      <form className="my-3" onSubmit={handleSubmit}>
      <label htmlFor="userName" className="form-label">Name: </label>
        <input
          name="name"
          className="form-control mb-3"
          value={profile.name}
          onChange={handleChange}
        />
         <label htmlFor="exampleFormControlInput1" className="form-label">Email address: </label>
        <input
          name="email"
          className="form-control mb-3"
          value={profile.email}
          onChange={handleChange}
        />
        <label htmlFor="userPhone" className="form-label">Phone: </label>
        <input
          name="phone"
          className="form-control mb-3"
          value={profile.phone}
          onChange={handleChange}
        />
        <label htmlFor="userAddress" className="form-label">Address: </label>
        <input
          name="address"
          className="form-control mb-3"
          value={profile.address}
          onChange={handleChange}
        />
        <Link to="/userInfo">
        <button className="btn btn-info w-100">CREATE AN ACCOUNT</button></Link>
        <Link to="/userInfo">
        <button className="btn btn-info w-100 mt-3">Already a User</button></Link>
      </form>
      </div>
    </>
  );
};

export default UserRegisterForm;
