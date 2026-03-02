import { useNavigate } from "react-router-dom";
import LightRays from "@/components/LightRays";
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="light-rays-bg">
        <LightRays />
      </div>

      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title">
            Simple, Fast & Secure
            <br />
            Digital Payments
          </h1>

          <p className="home-subtitle">
            Experience seamless UPI transfers, instant payments,
            and secure transactions — all in one place.
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
    </div>
  );
};

export default Home;