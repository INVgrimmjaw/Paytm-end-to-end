import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <h1 className="home-title">Paytm Clone</h1>
        <p className="home-subtitle">
          Fast, secure and seamless digital payments
        </p>

        <div className="home-actions">
          <button
            className="home-btn primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="home-btn secondary"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;