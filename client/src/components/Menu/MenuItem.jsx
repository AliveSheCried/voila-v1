import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { renderMenuItems } from "./Menu";

// MenuItem component
const MenuItem = ({ item, level, selectedItem, setSelectedItem }) => {
  const navigate = useNavigate();
  //console.log("path", item.path);

  const handleClick = () => {
    if (level > 1) {
      setSelectedItem(item.name);
      //navigate(`/${item.path}`);

      navigate(item.path);
    }
  };

  // Conditional class for hover effect
  const itemClass =
    level === 1
      ? ""
      : `menu-item text-sm ${
          selectedItem === item.name ? "menu-item__selected" : ""
        }`;

  return (
    <>
      <div className={itemClass} onClick={handleClick}>
        <div className="menu-item__left">
          {item.icon && (
            <span className="material-symbols-outlined menu-item__icon">
              {item.icon}
            </span>
          )}
          <span
            className={`menu-item__name${
              item.level === 1 ? " menu-item__l1" : ""
            }`}
          >
            {item.name}
          </span>
        </div>
      </div>
      {item.children?.length > 0 &&
        renderMenuItems(
          item.children,
          level + 1,
          selectedItem,
          setSelectedItem
        )}
    </>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  selectedItem: PropTypes.string.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MenuItem;
