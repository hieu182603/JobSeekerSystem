import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);

    // giả lập thanh toán 2 giây
    setTimeout(() => {
      alert("Thanh toán thành công 🎉");
      navigate("/job-application"); // quay về list
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/job-application"); // quay về list
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Thanh toán nâng cấp Job</h2>
        <p>Job ID: {id}</p>

        <div style={{ marginTop: 20 }}>
          <button
            onClick={handlePayment}
            disabled={loading}
            style={styles.payButton}
          >
            {loading ? "Đang xử lý..." : "Thanh toán"}
          </button>

          <button
            onClick={handleCancel}
            style={styles.cancelButton}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "white",
    padding: 40,
    borderRadius: 10,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  payButton: {
    padding: "10px 20px",
    marginRight: 10,
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default PaymentPage;
