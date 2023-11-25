import Logo from "../../components/Logo/Logo";
import Menu from "../../components/Menu/Menu";
import Settings from "../../components/Settings/Settings";

const Nav = () => {
  return (
    <nav>
      <div>
        <Logo />
        <Menu />
      </div>
      <div>
        <Settings />
      </div>
    </nav>
  );
};

export default Nav;
