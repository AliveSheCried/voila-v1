import { useState } from "react";
import "./assets/css/styles.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Nav from "./pages/Nav/Nav";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = useState("John Doe");

  const handleLogin = (email) => {
    const localName = email.split("@")[0];
    setName(localName);
    setIsAuth(true);
  };

  return isAuth ? (
    <Layout>
      <Nav />
      <Home name={name} />
    </Layout>
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
