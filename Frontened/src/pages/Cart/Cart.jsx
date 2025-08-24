import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ isLoggedIn }) => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const count = Object.values(cartItems).filter((qty) => qty > 0).length;
  const navigate = useNavigate();
  return (
    <>
      {count > 0 ? (
        <div className="cart">
          <table
            // className="cart-items-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th>Item</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "40px", height: "40px" }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>₹{item.price * 10 - 1}</td>
                      <td>{cartItems[item._id]}</td>
                      <td>₹{(item.price * 10 - 1) * cartItems[item._id]}</td>
                      <td>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
                          alt="Remove"
                          onClick={() => removeFromCart(item._id)}
                          style={{
                            width: "15px",
                            height: "15px",
                            cursor: "pointer",
                          }}
                        />
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>

          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>
                    ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                  </b>
                </div>
              </div>
              <button
                onClick={() =>
                  isLoggedIn ? navigate("/order") : navigate("/login")
                }
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, Enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            textAlign: "center",
            color: "#555",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <a href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              style={{ width: "120px", marginBottom: "20px", opacity: 0.8 }}
            />
            <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>
              Your cart is empty
            </h2>
            <p style={{ fontSize: "14px", color: "#888" }}>
              Looks like you haven’t added anything yet. Start exploring our
              menu!
            </p>
          </a>
        </div>
      )}
    </>
  );
};

export default Cart;
