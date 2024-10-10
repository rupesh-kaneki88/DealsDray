import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#212121', color: '#fff', padding: '20px 0' }}>
      <div className="footer-links">
        <Link to="/" style={{ color: '#fff', marginRight: '20px', textDecoration: 'none' }}>Home</Link>
        <Link to="/" style={{ color: '#fff', marginRight: '20px', textDecoration: 'none' }}>About</Link>
        <Link to="/" style={{ color: '#fff', marginRight: '20px', textDecoration: 'none' }}>Contact</Link>
      </div>

      <p style={{ marginTop: '10px', fontSize: '14px' }}> DealsDray Unique B2B Platform for Mobile Retailers</p>
    </footer>
  );
}

export default Footer;
