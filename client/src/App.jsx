import { useState } from "react";
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
    setIsAuth(true);
  };

  return isAuth ? (
    <Layout>
      <TokenContext.Provider value={{ tokenData, setToken: handleSetToken }}>
        <Nav />
        <Home name={name} />
      </TokenContext.Provider>
    </Layout>
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
