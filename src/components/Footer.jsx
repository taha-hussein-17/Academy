import React from 'react';
import { Link } from 'react-router-dom';
import brand from "../logo/logo512.png"; // Make sure the path to your logo is correct

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container text-center">
        <img
          src={brand}
          alt="T.H Academy"
          style={{ maxWidth: '130px', height: 'auto' }} // Adjust logo size as needed
        />
        <p>© 2025   T.H Academy - جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}

export default Footer;
