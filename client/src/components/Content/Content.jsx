import { useState } from "react";
//import ApiContent from "../ApiContent/ApiContent";
import CreateMerchantPayment from "../MerchantAccounts/CreateMerchantPayment";

import RightPanel from "../RightPanel/RightPanel";
import Start from "../Start/Start";

const Content = () => {
  const [active, setActive] = useState(true);
  return (
    <main>
      {/* <div className="main__content">{active ? <ApiContent /> : <Start />}</div> */}
      <div className="main__content">
        {active ? <CreateMerchantPayment /> : <Start />}
      </div>
      <div className="main__right-panel">
        <RightPanel />
      </div>
    </main>
  );
};

export default Content;
