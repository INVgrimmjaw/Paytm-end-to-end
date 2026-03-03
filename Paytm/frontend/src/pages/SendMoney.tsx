import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SendMoney.css";

const SendMoney = () => {
  const navigate = useNavigate();

  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!recipientEmail || !amount || Number(amount) <= 0) {
      setError("Please enter valid details");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/transaction/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            recipientEmail,
            amount: Number(amount),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Transaction failed");
        setLoading(false);
        return;
      }

      setMessage("Money sent successfully");
      setRecipientEmail("");
      setAmount("");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="send-container">
      <div className="send-card">

        <div className="send-header">
          <h2>Send Money</h2>
          <p>Transfer funds securely and instantly</p>
        </div>

        <form onSubmit={handleTransfer} className="send-form">
          <input
            type="email"
            placeholder="Recipient Email"
            className="send-input"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            className="send-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />

          {error && <p className="send-error">{error}</p>}
          {message && <p className="send-success">{message}</p>}

          <button
            type="submit"
            className="send-btn"
            disabled={loading}
          >
            {loading ? "Processing..." : "Transfer"}
          </button>
        </form>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
};

export default SendMoney;