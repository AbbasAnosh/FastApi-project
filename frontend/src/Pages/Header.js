import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div
          className="container-fluid"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <Link to="/" className="navbar-brand">
            <a className="navbar-brand">Transaction App</a>
          </Link>

          <Link to="/transactionsform" class="navbar-brand">
            <a className="navbar-brand">Add Transaction</a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
