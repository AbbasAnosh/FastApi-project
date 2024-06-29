import React, { useState } from "react";
import api from "../api";

const TransactionDetails = ({
  transactions,
  fetchTransactions,
  deleteTransaction,
}) => {
  const [editTransaction, setEditTransaction] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (transaction) => {
    setEditTransaction(transaction.id);
    setFormData(transaction);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/transactions/${id}`, formData);
      setEditTransaction(null);
      fetchTransactions();
    } catch (error) {
      console.error("There was an error updating the transaction!", error);
    }
  };
  return (
    <div className="table-responsive" style={{ margin: "1rem" }}>
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Income</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {editTransaction === transaction.id ? (
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                ) : (
                  transaction.amount
                )}
              </td>
              <td>
                {editTransaction === transaction.id ? (
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                ) : (
                  transaction.category
                )}
              </td>
              <td>
                {editTransaction === transaction.id ? (
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                ) : (
                  transaction.description
                )}
              </td>
              <td>
                {editTransaction === transaction.id ? (
                  <input
                    type="checkbox"
                    name="is_income"
                    checked={formData.is_income}
                    onChange={(e) =>
                      setFormData({ ...formData, is_income: e.target.checked })
                    }
                  />
                ) : transaction.is_income ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>

              <td>
                {editTransaction === transaction.id ? (
                  <input
                    type="text"
                    class="form-control"
                    id="date"
                    name="date"
                    onChange={handleChange}
                    value={formData.date}
                    placeholder="YYYY-MM-DD"
                  />
                ) : (
                  transaction.date
                )}
              </td>
              <td>
                {editTransaction === transaction.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdate(transaction.id)}
                    >
                      Update
                    </button>{" "}
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditTransaction(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(transaction)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
