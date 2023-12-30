import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// ...
import "./assets/css/styles.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Nav from "./pages/Nav/Nav";

// contexts
import { TokenContext } from "./contexts/TokenContext";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("");

  const [tokenData, setToken] = useState({
    name: "",
    type: "",
    expiry: "",
    state: "",
    accessToken: "",
  });

  const handleSetToken = (newTokenData) => {
    setToken(newTokenData);
  };

  const handleLogin = (email) => {
    const localName = email.split("@")[0];
    setName(localName);
    setEmail(email);
    setIsAuth(true);
  };

  return isAuth ? (
    <Router>
      <Layout>
        <TokenContext.Provider value={{ tokenData, setToken: handleSetToken }}>
          <Nav />
          <Routes>
            <Route path="/*" element={<Home name={name} email={email} />} />
          </Routes>
        </TokenContext.Provider>
      </Layout>
    </Router>
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
