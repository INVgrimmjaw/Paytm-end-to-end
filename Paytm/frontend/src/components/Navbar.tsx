import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        <span className="logo-icon">₹</span>
        <span className="logo-text">Paytm Clone</span>
      </div>

      <div className="navbar-center">
        <button>Company</button>
        <button>Our Solutions</button>
        <button>Investor Relations</button>
        <button>Contact Us</button>
        <button>Trust & Safety</button>
      </div>

      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/signup" className="nav-btn primary">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-btn">Dashboard</Link>
            <button onClick={handleLogout} className="nav-btn primary">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;