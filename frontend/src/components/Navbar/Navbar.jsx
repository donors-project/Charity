// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-500 text-white p-4">
//       <ul className="flex space-x-4">
//         <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
//         <li><Link to="/about" className="hover:text-gray-200">About</Link></li>
//         <li><Link to="/admin" className="hover:text-gray-200">Admin</Link></li>
//         <li><Link to="/announcements" className="hover:text-gray-200">Announcements</Link></li>
//         <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
//         <li><Link to="/beneficiary-profile" className="hover:text-gray-200">Beneficiary Profile</Link></li>
//         <li><Link to="/donor-profile" className="hover:text-gray-200">Donor Profile</Link></li>
//         <li><Link to="/login" className="hover:text-gray-200">Login</Link></li>
//         <li><Link to="/orders-history" className="hover:text-gray-200">Orders History</Link></li>
//         <li><Link to="/payment" className="hover:text-gray-200">Payment</Link></li>
//         <li><Link to="/register-beneficiary" className="hover:text-gray-200">Register Beneficiary</Link></li>
        // <li><Link to="/register-donor" className="hover:text-gray-200">Register Donor</Link></li>
//         <li><Link to="/single-page/:id" className="hover:text-gray-200">Single Page</Link></li>
//         <li><Link to="/top-donations" className="hover:text-gray-200">Top Donations</Link></li>
//         <li><Link to="/zakah-calculator" className="hover:text-gray-200">Zakah Calculator</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tokenResponse = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });

        const userId = tokenResponse.data.id;
        const userRole = tokenResponse.data.role;
        console.log(userRole,userId);

        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          withCredentials: true,
        });

        setUser(userId);
        setRole(userRole || userResponse.data.role);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
  };

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "حاسبة الزكاة", href: "/zakah-calculator" },
    { name: "فرص التبرع", href: "/announcements" },
    { name: "عن الموقع", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  if (role === "Admin") {
    navLinks.push({ name: "لوحة تحكم", href: "/admin" });
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img src={logo} alt="شعار الموقع" className="h-50 w-50 rounded-full mb-7" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-6 md:space-x-reverse">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-lg font-medium text-[#727D73] hover:text-[#5A645B] transition-all ${
                    window.location.pathname === link.href
                      ? "border-b-2 border-[#727D73]"
                      : "border-b-2 border-transparent"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <Link
                to="/login"
                className="px-4 py-2 border border-[#727D73] rounded-md text-[#727D73] hover:bg-[#727D73] hover:text-white transition duration-300"
              >
                تسجيل الدخول
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-[#727D73] rounded-md text-[#727D73] hover:bg-[#727D73] hover:text-white transition duration-300"
                >
                  تسجيل الخروج
                </button>
                <Link to={role === "donor" ? "/donor-profile" : "/beneficiary-profile"}>
                  <User className="h-8 w-8 text-[#727D73] hover:text-[#5A645B] cursor-pointer" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#727D73] hover:text-[#5A645B] hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-right font-medium text-[#727D73] hover:bg-gray-100 transition-all ${
                  window.location.pathname === link.href
                    ? "border-b-2 border-[#727D73]"
                    : "border-b-2 border-transparent"
                }`}
              >
                {link.name}
              </a>
            ))}
            {!user ? (
              <Link
                to="/login"
                className="block w-full mt-3 px-3 py-2 border border-[#727D73] rounded-md text-[#727D73] hover:bg-[#727D73] hover:text-white transition duration-300 text-center"
              >
                تسجيل الدخول
              </Link>
            ) : (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 border border-red-500 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition duration-300 text-center"
                >
                  تسجيل الخروج
                </button>

                <Link
                  to={role === "donor" ? "/donor-profile" : "/beneficiary-profile"}
                  className="flex justify-center"
                >
                  <User className="h-8 w-8 text-[#727D73] hover:text-[#5A645B] cursor-pointer" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

