import { useState } from "react";
import ApiContent from "../ApiContent/ApiContent";
import Start from "../Start/Start";
import Tokens from "../Tokens/Tokens";

const Content = () => {
  const [active, setActive] = useState(false);
  return (
    <main>
      {active ? <ApiContent /> : <Start />}
      <Tokens />
    </main>
  );
};

export default Content;
