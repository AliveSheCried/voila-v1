import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// ...
import "./assets/css/styles.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Nav from "./pages/Nav/Nav";

// contexts
import { DataTokenContext, PaymentTokenContext } from "./contexts/TokenContext";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("");

  const [dataToken, setDataToken] = useState({
    name: "",
    type: "",
    expiry: "",
    state: "",
    accessToken: "",
  });

  const [paymentToken, setPaymentToken] = useState({
    name: "",
    type: "",
    expiry: "",
    state: "",
    accessToken: "",
  });

  // const handleSetToken = (newTokenData) => {
  //   setToken(newTokenData);
  // };

  const handleLogin = (email) => {
    const localName = email.split("@")[0];
    setName(localName);
    setEmail(email);
    setIsAuth(true);
  };

  return isAuth ? (
    <Router>
      <Layout>
        <DataTokenContext.Provider
          value={{ token: dataToken, setToken: setDataToken }}
        >
          <PaymentTokenContext.Provider
            value={{ token: paymentToken, setToken: setPaymentToken }}
          >
            <Nav />
            <Routes>
              <Route path="/*" element={<Home name={name} email={email} />} />
            </Routes>
          </PaymentTokenContext.Provider>
        </DataTokenContext.Provider>
      </Layout>
    </Router>
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
