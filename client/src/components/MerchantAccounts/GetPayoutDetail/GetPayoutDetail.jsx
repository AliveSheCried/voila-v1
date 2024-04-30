import axios from "axios";
import React, { useEffect, useState } from "react";

const GetPayoutDetail = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/transactions")
      .then((response) => setTransactions(response.data.transactions))
      .catch((error) => setError(error));
  }, []);

  console.log(transactions);
  if (error) return <div>Error loading transactions.</div>;
  return (
    <div>
      <div className="content__head">
        <span className="content__arrow">&raquo;</span> Payout detail
      </div>
      <ul>
        {transactions.map((tx) => (
          <li key={tx._id}>
            {tx.account_holder_name} - {tx.amount_in_minor / 100}
          </li>
        ))}
      </ul>
    </div>
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
