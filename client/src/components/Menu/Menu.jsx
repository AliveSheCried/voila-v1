import PropTypes from "prop-types";
import { useState } from "react";

const menuItems = [
  {
    name: "Home",
    icon: "home",
    level: 1,
    children: [],
  },
  {
    name: "TrueLayer",
    icon: "folder",
    level: 1,
    children: [
      {
        name: "Data API",
        icon: "l2",
        level: 2,
        children: [
          { name: "Generate Data API token", level: 3 },
          { name: "Data API end point 1", level: 3 },
          { name: "Data API end point 2", level: 3 },
        ],
      },
      {
        name: "Payment API",
        icon: "l2",
        level: 2,
        children: [
          { name: "Generate Payment API token", level: 3 },
          { name: "Payment API end point 1", level: 3 },
          { name: "Payment API end point 2", level: 3 },
        ],
      },
    ],
  },
  {
    name: "Plaid",
    icon: "folder",
    level: 1,
    children: [],
  },
];

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

const MenuItem = ({ item, level, selectedItem, setSelectedItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let icon;
  if (item.icon === "folder") {
    icon = "code_blocks";
  } else if (item.icon === "home") {
    icon = "home";
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    setSelectedItem(item.name);
  };

  return (
    <>
      <div
        className={`menu-item text-sm ${
          selectedItem === item.name ? "menu-item__selected" : ""
        }`}
        onClick={handleClick}
      >
        <div className="menu-item__left">
          <span className="material-symbols-outlined menu-item__icon">
            {icon && icon}
          </span>
          <span
            className={`menu-item__name${
              item.level === 2
                ? " menu-item__l2"
                : item.level === 3
                ? " menu-item__l3"
                : ""
            }`}
          >
            {item.name}
          </span>
        </div>
        <span className="menu-item__expand material-symbols-sharp">
          {item.children?.length > 0 && (isExpanded ? "remove" : "add")}
        </span>
      </div>
      {isExpanded &&
        item.children?.length > 0 &&
        renderMenuItems(
          item.children,
          level + 1,
          selectedItem,
          setSelectedItem
        )}
    </>
  );
};

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
