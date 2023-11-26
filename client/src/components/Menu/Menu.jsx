import PropTypes from "prop-types";
import { useState } from "react";
import MenuItem from "./MenuItem";
import { menuItems } from "./menuItems";

// Recursive function to render menu items
export const renderMenuItems = (
  items,
  level = 1,
  selectedItem,
  setSelectedItem
) => {
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
