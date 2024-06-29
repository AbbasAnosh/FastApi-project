import React from "react";

const TransactionDetails = ({ transactions, onEdit, onDelete }) => {
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
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>{transaction.is_income ? "Yes" : "No"}</td>
              <td>{transaction.date}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onEdit(transaction.id)}
                >
                  Edit
                </button>{" "}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
