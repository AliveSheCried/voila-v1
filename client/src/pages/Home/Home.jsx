import PropTypes from "prop-types";
import { useState } from "react";
import Content from "../../components/Content/Content";
import Header from "../../components/Header/Header";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";

const Home = ({ name, email }) => {
  const [merchantAccounts, setMerchantAccounts] = useState([]);
  return (
    <div className="container__content">
      <Header name={name} email={email} />
      <MerchantAccountContext.Provider
        value={{ merchantAccounts, setMerchantAccounts }}
      >
        <Content />
      </MerchantAccountContext.Provider>
    </div>
  );
  // return (
  //   <div className="container__content">
  //     <Header name={name} email={email} />
  //     <Content />
  //   </div>
  // );
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Home;
