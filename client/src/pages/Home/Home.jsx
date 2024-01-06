import PropTypes from "prop-types";
import { useState } from "react";
import Content from "../../components/Content/Content";
import Header from "../../components/Header/Header";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { MerchantAccountTransactionContext } from "../../contexts/MerchantAccountTransactionContext";

const Home = ({ name, email }) => {
  const [merchantAccounts, setMerchantAccounts] = useState([]);
  const [merchantAccountTransactions, setMerchantAccountTransactions] =
    useState([]);

  return (
    <div className="container__content">
      <Header name={name} email={email} />
      <MerchantAccountContext.Provider
        value={{ merchantAccounts, setMerchantAccounts }}
      >
        <MerchantAccountTransactionContext.Provider
          value={{
            merchantAccountTransactions,
            setMerchantAccountTransactions,
          }}
        >
          <Content />
        </MerchantAccountTransactionContext.Provider>
      </MerchantAccountContext.Provider>
    </div>
  );
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Home;
