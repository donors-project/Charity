import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
        <li><Link to="/about" className="hover:text-gray-200">About</Link></li>
        <li><Link to="/admin" className="hover:text-gray-200">Admin</Link></li>
        <li><Link to="/announcements" className="hover:text-gray-200">Announcements</Link></li>
        <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
        <li><Link to="/beneficiary-profile" className="hover:text-gray-200">Beneficiary Profile</Link></li>
        <li><Link to="/donor-profile" className="hover:text-gray-200">Donor Profile</Link></li>
        <li><Link to="/login" className="hover:text-gray-200">Login</Link></li>
        <li><Link to="/orders-history" className="hover:text-gray-200">Orders History</Link></li>
        <li><Link to="/payment" className="hover:text-gray-200">Payment</Link></li>
        <li><Link to="/register-beneficiary" className="hover:text-gray-200">Register Beneficiary</Link></li>
        <li><Link to="/register-donor" className="hover:text-gray-200">Register Donor</Link></li>
        <li><Link to="/single-page/:id" className="hover:text-gray-200">Single Page</Link></li>
        <li><Link to="/top-donations" className="hover:text-gray-200">Top Donations</Link></li>
        <li><Link to="/zakah-calculator" className="hover:text-gray-200">Zakah Calculator</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
