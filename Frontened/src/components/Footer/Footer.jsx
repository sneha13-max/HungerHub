import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img
            src={assets.logo}
            alt=""
            style={{ width: "180px", marginBottom: "10px", opacity: 2 }}
          />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.{" "}
          </p>
          <div className="footer-social-icons">
            <a href="#footer">
              <img src={assets.facebook_icon} alt="" />
            </a>
            <a href="#footer">
              <img src={assets.twitter_icon} alt="" />
            </a>
            <a href="#footer">
              <img src={assets.linkedin_icon} alt="" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <a href='/'><li>Home</li></a>
            <a href='#footer'><li>About us</li></a>
            <a href='#footer'><li>Delivery</li></a>
            <a href='#footer'><li>Privacy policy</li></a>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@hungerhub.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright {year} hungerhub.com-All Right Reserved{" "}
      </p>
    </div>
  );
}

export default Footer
