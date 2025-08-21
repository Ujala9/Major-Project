import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="card-title display-4 fw-bold">
              Latest in Technology
            </h1>
            <p className="lead">
              Discover our range of high-quality electronics
            </p>
            <Link to="/products" className="btn btn-info mb-3">Shop Now</Link>
          </div>
          <div className="col-md-6 text-center">
            <img
              // src="https://t3.ftcdn.net/jpg/02/35/84/44/240_F_235844454_RTTLpnm2asRdwNJ97MU0ENJqnCSUdXQv.jpg"
              // alt="Electronics Banner"
              src="https://t4.ftcdn.net/jpg/03/64/41/07/360_F_364410756_Ev3WoDfNyxO9c9n4tYIsU5YBQWAP3UF8.jpg"
              className="img-fluid mt-2 border-0 shadow-none rounded-0"
              style={{ maxHeight: "600px" }}
            />
          </div>
        </div>
      </div>

      <section className="container">
        <h1 className="text-center my-4">Featured Catagories</h1>
        <div class="row">
          <div class="col-sm-6 my-3 mb-sm-0">
            <div class="card-body">
              <img
                src={
                  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                style={{ width: 450, height: 350 }}
                className="img-fluid rounded"
              />
              <h3 class="card-title fw-bold mb-3">Laptops</h3>
              <Link to="/products?category=Laptops" class="btn btn-info">
                explore
              </Link>
            </div>
          </div>
          <div class="col-sm-6 my-3">
            <div class="card-body">
              <img
                src={
                  "https://images.pexels.com/photos/248510/pexels-photo-248510.jpeg?_gl=1*19wac9z*_ga*MTA5NjMzMTY3OC4xNzQxODUxODQx*_ga_8JE65Q40S6*czE3NTM0MjEzMTUkbzMkZzEkdDE3NTM0MjEzNTIkajIzJGwwJGgw"
                }
                alt="img"
                style={{ width: 450, height: 350 }}
                className="img-fluid rounded"
              />
              <h3 class="card-title fw-bold mb-3">Earphones</h3>
              <Link to="" class="btn btn-info">
                explore
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
