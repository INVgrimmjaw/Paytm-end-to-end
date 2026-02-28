import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";

interface User {
  name: string;
  email: string;
  balance: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">

      <nav className="dashboard-navbar">
        <div className="nav-logo">Paytm Clone</div>
        <div className="nav-links">
          <button onClick={() => navigate("/send")}>Pay to Number</button>
          <button>Last Payments</button>
          <button>Book Hotel</button>
          <button>Book Flight</button>
          <button>Contact Us</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-hero">
        <h1>Simple, fast & secure transactions</h1>
        <p>Welcome back, {user.name}</p>
      </div>

      <div className="dashboard-cards">

        <div className="wallet-card">
          <h2>Wallet Balance</h2>
          <p>₹ {user.balance.toFixed(2)}</p>
        </div>

        <div className="quick-card" onClick={() => navigate("/send")}>
          Send Money
        </div>

        <div className="quick-card">
          Transaction History
        </div>

      </div>

    </div>
  );
};

export default Dashboard;