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

  const deleteTransaction = async (id) => {
    try {
      const response = await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <TransactionDetails
              transactions={transactions}
              deleteTransaction={deleteTransaction}
              fetchTransactions={fetchTransactions}
            />
          }
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
