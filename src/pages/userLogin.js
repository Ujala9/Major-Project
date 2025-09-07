import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <>
      <h1 className="text-center py-5 bg-body-tertiary fw-bold">
        Customer Login
      </h1>
      <div className="container" style={{ maxWidth: "600px" }}>
        <h3 className="mt-4 fw-bold">Registered Customers</h3>
        <p>If you have an account, sign in with your email address.</p>
        <form>
          <label for="inputEmail" class="form-label">
            Email <span class="text-danger">*</span>
          </label>
          <input type="email" id="inputEmail" class="form-control" />
          <label for="inputPassword5" class="form-label">
            Password <span class="text-danger">*</span>
          </label>
          <input
            type="password"
            id="inputPassword5"
            class="form-control"
            aria-describedby="passwordHelpBlock"
          />

          
          <Link to="/" className="d-block my-3 text-decoration-none">
            Forgot Your Password?
          </Link>

          <div className="d-grid gap-3 my-4">
            <button
              class="btn btn-info"
              type="button"
              style={{ borderRadius: "0" }}
            >
              SIGN IN
            </button>
            <Link to="/register"
              
                className="btn btn-info"
                type="button"
                style={{ borderRadius: "0" }}
              >
                CREATE AN ACCOUNT
              
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
