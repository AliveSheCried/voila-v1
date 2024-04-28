import axios from "axios";
import React, { useEffect, useState } from "react";

const GetPayoutDetail = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/transactions")
      .then((response) => setTransactions(response.data))
      .catch((error) => setError(error));
  }, []);

  if (error) return <div>Error loading transactions.</div>;
  return (
    <ul>
      {transactions.map((tx) => (
        <li key={tx._id}>
          {tx.description} - {tx.amount}
        </li>
      ))}
    </ul>
  );
  //   return (
  //     <div>
  //       <div className="content__head">
  //         <span className="content__arrow">&raquo;</span> Get payout detail
  //       </div>

  //       <PayoutSearch />
  //     </div>
  //   );
};

export default GetPayoutDetail;
