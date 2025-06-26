import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch, FaClock } from 'react-icons/fa'; // React Icons

const NavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-200 py-2 px-4 flex justify-around items-center">
      <Link to="/Timeline" className="flex flex-col items-center">
        <FaClock size={24} />
        <span className="text-xs">Timeline</span>
      </Link>

      <Link to="/Search" className="flex flex-col items-center">
        <FaSearch size={24} />
        <span className="text-xs">Search</span>
      </Link>

      <Link to="/Profile" className="flex flex-col items-center">
        <FaUser size={24} />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
};

export default NavigationBar;