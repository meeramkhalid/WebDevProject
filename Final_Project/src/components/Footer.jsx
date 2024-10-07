import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import '../components_styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Information</a></li>
            <li><a href="#">Cancellation Options</a></li>
          </ul>
        </div>
        <div>
          <h4>Community</h4>
          <ul>
            <li><a href="#">Airbnb.org</a></li>
            <li><a href="#">Diversity & Belonging</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
        <div>
          <h4>Hosting</h4>
          <ul>
            <li><a href="#">Try Hosting</a></li>
            <li><a href="#">Host an Experience</a></li>
            <li><a href="#">Responsible Hosting</a></li>
          </ul>
        </div>
        <div>
          <h4>About</h4>
          <ul>
            <li><a href="#">Newsroom</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Investors</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-social">
        <a href="https://www.facebook.com"><FaFacebook /></a>
        <a href="https://www.twitter.com"><FaTwitter /></a>
        <a href="https://www.instagram.com"><FaInstagram /></a>
      </div>

      <div className="footer-copyright">
        <p>© 2024 Airbnb, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
