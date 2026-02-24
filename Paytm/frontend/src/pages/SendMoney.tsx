import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SendMoney.css";

const SendMoney = () => {
  const navigate = useNavigate();

  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/transaction/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipientEmail,
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Transaction failed");
        return;
      }

      setMessage("Money sent successfully");
      setRecipientEmail("");
      setAmount(0);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="send-container">
      <div className="send-wrapper">
        <h2 className="send-title">Send Money</h2>

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
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            min="1"
          />

          {error && <p className="send-error">{error}</p>}
          {message && <p className="send-success">{message}</p>}

          <button type="submit" className="send-btn">
            Transfer
          </button>
        </form>

        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SendMoney;