import React, { useState, useEffect } from "react";
import api from "./api";
import Header from "./Pages/Header";

import TransactionForm from "./Pages/TransactionForm";
import TransactionDetails from "./Pages/TransactionDetails";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions/");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<TransactionDetails transactions={transactions} />}
        />
        <Route
          path="/transactionsform"
          element={<TransactionForm fetchTransactions={fetchTransactions} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
