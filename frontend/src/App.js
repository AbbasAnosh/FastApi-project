import React, { useState, useEffect } from "react";
import api from "./api";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    is_income: false,
    date: "",
  });

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions/");
      console.log(response);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    const value =
      e.target.value === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/transactions/", formData);
      fetchTransactions();
      // const newTransaction = await response.json();
      // setTransactions([...transactions, newTransaction]);
      setFormData({
        description: "",
        amount: "",
        category: "",
        is_income: false,
        date: "",
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };
  return (
    <div>
      <nav class="navbar navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Transaction App
          </a>
        </div>
      </nav>

      <div class="container mt-5">
        <form onSubmit={handleSubmit} class="bg-white p-4 shadow rounded">
          <h2 class="text-center mb-4">Transaction Details</h2>
          <div class="mb-3">
            <label for="amount" class="form-label">
              Amount
            </label>
            <input
              type="text"
              class="form-control"
              id="amount"
              name="amount"
              onChange={handleChange}
              value={formData.amount}
              placeholder="Enter amount"
            />
          </div>

          <div class="mb-3">
            <label for="category" class="form-label">
              Category
            </label>
            <input
              type="text"
              class="form-control"
              id="category"
              name="category"
              onChange={handleChange}
              value={formData.category}
              placeholder="e.g., Utilities, Groceries"
            />
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="description"
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Transaction description"
            />
          </div>

          <div class="mb-3">
            <label for="is_income" class="form-label d-block">
              Is Income?
            </label>
            <input
              type="checkbox"
              class="form-check-input"
              id="is_income"
              name="is_income"
              onChange={handleChange}
              checked={formData.is_income}
            />
          </div>

          <div class="mb-4">
            <label for="date" class="form-label">
              Date
            </label>
            <input
              type="text"
              class="form-control"
              id="date"
              name="date"
              onChange={handleChange}
              value={formData.date}
              placeholder="YYYY-MM-DD"
            />
          </div>

          <button type="submit" class="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
