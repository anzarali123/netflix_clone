import React from "react";

function NotAvailable({ data }) {
  return (
    <h1 className="not-available">{`NO ${data} available for selected genre. `}</h1>
  );
}

export default NotAvailable;
