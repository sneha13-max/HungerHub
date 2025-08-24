import React from 'react'
import './PlaceOrder.css'
import { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router-dom";

const PlaceOrder = ({name}) => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const count = Object.values(cartItems).filter((qty) => qty > 0).length;
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    email: "",
  });
  const totalAmount = getTotalCartAmount();
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    const amount = totalAmount === 0 ? 0 : totalAmount + 2;

    if (amount === 0) {
      alert("Cart is empty!");
      return;
    }

    const fullAddress = `${address.firstName} ${address.lastName}, ${address.street}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}. Phone: ${address.phone}`;

    const options = {
      key: razorpayKey,
      amount: amount * 100,
      currency: "INR",
      name: "Food Ordering",
      description: "Order Payment",
      handler: async function (response) {
        alert("Payment successful.");
        const orderData = {
          paymentId: response.razorpay_payment_id,
          amount,
          currency: "INR",
          name: `${address.firstName} ${address.lastName}`,
          email: `${address.email}`,
          contact: address.phone,
          items: cartItems,
          address: fullAddress,
        };

        try {
          await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/orders/save-order`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderData),
            }
          );
        } catch (err) {
          console.error("Error saving order:", err);
        }
        
        localStorage.removeItem("cartItems", JSON.stringify(cartItems));
        window.location.reload();
      },
      prefill: {
        name: `${address.firstName} ${address.lastName}`,
        email: `${address.email}`,
        contact: String(address.phone),
      },
      notes: {
        address: fullAddress,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <>
      {count > 0 ? (
        <form className="place-order">
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={address.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={address.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={address.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={handleChange}
            />
            <div className="multi-fields">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
              />
            </div>
            <div className="multi-fields">
              <input
                type="text"
                name="zip"
                placeholder="Zip code"
                value={address.zip}
                onChange={handleChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={address.phone}
              onChange={handleChange}
            />
          </div>
          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₹{totalAmount}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹{totalAmount === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>₹{totalAmount === 0 ? 0 : totalAmount + 2}</b>
                </div>
              </div>
              <button onClick={handlePayment}>PROCEED TO PAYMENT</button>
            </div>
          </div>
        </form>
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
              src="https://cdn-icons-png.flaticon.com/512/679/679821.png"
              alt="Empty Checkout"
              style={{ width: "120px", marginBottom: "20px", opacity: 0.8 }}
            />
            <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>
              No items to checkout
            </h2>
            <p style={{ fontSize: "14px", color: "#888" }}>
              Your cart is empty. Add some items to proceed with checkout.
            </p>
          </a>
        </div>
      )}
    </>
  );
}

export default PlaceOrder
