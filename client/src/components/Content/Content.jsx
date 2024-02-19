import { Route, Routes } from "react-router-dom";

import RightPanel from "../RightPanel/RightPanel";
import Start from "../Start/Start";

//routes
import CreateMerchantPayment from "../MerchantAccounts/CreateMerchantPayment";
import GetMerchantAccount from "../MerchantAccounts/GetMerchantAccount";
import GetMerchantAccounts from "../MerchantAccounts/GetMerchantAccounts";
import GetTransactions from "../MerchantAccounts/GetTransactions";

const Content = () => {
  return (
    <main>
      <div className="main__content">
        <Routes>
          <Route path="getMerchantAccount" element={<GetMerchantAccount />} />
          <Route path="getMerchantAccounts" element={<GetMerchantAccounts />} />
          <Route path="getTransactions" element={<GetTransactions />} />
          <Route path="payout" element={<CreateMerchantPayment />} />
          <Route path="/" element={<Start type={"home"} />} />
        </Routes>
      </div>
      <div className="main__right-panel">
        <RightPanel />
      </div>
    </main>
  );
};

export default Content;
