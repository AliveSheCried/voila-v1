import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// ...
import "./assets/css/styles.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Nav from "./pages/Nav/Nav";

//context providers
import { DataTokenProvider } from "./providers/DataTokenProvider";
import { MerchantAccountDataTokenProvider } from "./providers/MerchantAccountDataTokenProvider";
import { PaymentTokenProvider } from "./providers/PaymentTokenProvider";
import { UserBankDataProvider } from "./providers/UserBankDataProvider";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("");

  const handleLogin = (email) => {
    const localName = email.split("@")[0];
    setName(localName);
    setEmail(email);
    setIsAuth(true);
  };

  return isAuth ? (
    <Router>
      <PaymentTokenProvider>
        <MerchantAccountDataTokenProvider>
          <DataTokenProvider>
            <UserBankDataProvider>
              <Layout>
                <Nav />
                <Routes>
                  <Route
                    path="/*"
                    element={<Home name={name} email={email} />}
                  />
                </Routes>
              </Layout>
            </UserBankDataProvider>
          </DataTokenProvider>
        </MerchantAccountDataTokenProvider>
      </PaymentTokenProvider>
    </Router>
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
