import Avatar from "../../components/Avatar/Avatar";
import Logo from "../../components/Logo/Logo";
import Menu from "../../components/Menu/Menu";

const Nav = () => {
  return (
    <nav>
      <div>
        <Logo />
        <Menu />
      </div>
      <div>
        <Avatar />
      </div>
    </nav>
  );
};

export default Nav;
