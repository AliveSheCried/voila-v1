import PropTypes from "prop-types";
import { useState } from "react";
import { menuItems } from "./menuItems";

// MenuItem component
const MenuItem = ({ item, level, selectedItem, setSelectedItem }) => {
  const handleClick = () => {
    if (level > 1) {
      setSelectedItem(item.name);
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

// Recursive function to render menu items
const renderMenuItems = (items, level = 1, selectedItem, setSelectedItem) => {
  return items.map((item, index) => (
    <MenuItem
      key={index}
      item={item}
      level={level}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />
  ));
};

// Menu component
const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div className="menu">
      {renderMenuItems(menuItems, 1, selectedItem, setSelectedItem)}
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
    level: PropTypes.number,
    children: PropTypes.array,
  }),
  level: PropTypes.number,
  selectedItem: PropTypes.string,
  setSelectedItem: PropTypes.func,
};

export default Menu;
