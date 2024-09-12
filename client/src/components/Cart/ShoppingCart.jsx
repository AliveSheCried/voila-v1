import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const ShoppingCart = ({
  items,
  handlePriceChange,
  total,
  handleBackClick,
  handleNextClick,
}) => {
  return (
    <div className="shopping-cart">
      <h2 className="cart-title">Your Shopping Cart</h2>
      <ul className="cart-items">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <span className="item-name">{item.name}</span>
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                handlePriceChange(item.id, Number(e.target.value))
              }
              className="price-input"
              aria-label={`Price for ${item.name}`}
            />
          </li>
        ))}
      </ul>
      <div className="cart-total">Total: ${total.toFixed(2)}</div>
      <div className="button-group">
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
        <button className="next-button" onClick={handleNextClick}>
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

ShoppingCart.propTypes = {
  items: PropTypes.array,
  handlePriceChange: PropTypes.func,
  total: PropTypes.number,
  handleBackClick: PropTypes.func,
  handleNextClick: PropTypes.func,
};

export default ShoppingCart;
