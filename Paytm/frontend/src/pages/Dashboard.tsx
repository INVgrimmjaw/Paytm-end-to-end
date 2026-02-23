import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Dashboard.css";

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
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">

        <div className="dashboard-card">
          <h1 className="dashboard-title">
            Welcome, {user.name}
          </h1>
          <p className="dashboard-email">{user.email}</p>
        </div>

        <div className="wallet-card">
          <h2 className="wallet-title">Wallet Balance</h2>
          <p className="wallet-balance">
            ₹ {user.balance.toFixed(2)}
          </p>
        </div>

        <div className="dashboard-actions">
          <button
            onClick={() => navigate("/send")}
            className="btn btn-send"
          >
            Send Money
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-logout"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;