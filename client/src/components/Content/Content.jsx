import { Route, Routes } from "react-router-dom";
import RightPanel from "../RightPanel/RightPanel";
import Start from "../Start/Start";

//tl merchant account routes
import CreateMerchantPayment from "../MerchantAccounts/CreateMerchantPayment/CreateMerchantPayment";
import GetMerchantAccounts from "../MerchantAccounts/GetMerchantAccounts";
import GetPayoutDetail from "../MerchantAccounts/GetPayoutDetail/GetPayoutDetail";
import GetTransactions from "../MerchantAccounts/GetTransactions/GetTransactions";

//tl data api routes
import GetBankDataAccountBalance from "../TlDataApi/GetBankDataAccountBalance";
import GetDataAccounts from "../TlDataApi/GetDataAccounts";
import GetDataDirectDebits from "../TlDataApi/GetDataDirectDebits";
import GetDataStandingOrders from "../TlDataApi/GetDataStandingOrders";
import GetDataTransactions from "../TlDataApi/GetDataTransactions";

//tl user created payment
import Cart from "../Cart/Cart";

//redirect
import Redirect from "../Redirect/Redirect";

const Content = () => {
  return (
    <main>
      <div className="main__content">
        <Routes>
          {/* Data API routes */}
          <Route path="getDataAccounts" element={<GetDataAccounts />} />
          <Route path="getDataDirectDebits" element={<GetDataDirectDebits />} />
          <Route
            path="getDataStandingOrders"
            element={<GetDataStandingOrders />}
          />
          <Route
            path="getDataAccountBalance"
            element={<GetBankDataAccountBalance />}
          />
          <Route path="getDataTransactions" element={<GetDataTransactions />} />

          {/* Merchant Account routes */}
          {/* <Route path="getMerchantAccount" element={<GetMerchantAccount />} /> */}
          <Route path="getMerchantAccounts" element={<GetMerchantAccounts />} />
          <Route path="getTransactions" element={<GetTransactions />} />
          <Route path="payout" element={<CreateMerchantPayment />} />
          <Route path="getPayoutDetails" element={<GetPayoutDetail />} />

          {/* Other */}
          <Route path="/" element={<Start type={"home"} />} />
          <Route path="cart" element={<Cart />} />

          {/* Redirect */}
          <Route path="redirect" element={<Redirect />} />
        </Routes>
      </div>
      <div className="main__right-panel">
        <RightPanel />
      </div>
    </main>
  );
};

export default Content;
