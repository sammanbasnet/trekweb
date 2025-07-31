import { Bell, LogOut, User } from "lucide-react";
import React from "react";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-red-950 to-red-900 text-white p-4 flex justify-between items-center shadow-lg border-b border-red-800">
      {/* Admin Panel Title with Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-lg">
          <img src={logo} alt="Trek App Logo" className="w-8 h-8 object-contain" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Trek Admin Dashboard</h1>
          <p className="text-red-300 text-xs">Manage your trekking business</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon */}
        <button className="relative p-3 rounded-full hover:bg-red-800 transition-all duration-200 group">
          <Bell size={20} className="group-hover:scale-110 transition-transform" />
          <span className="absolute top-1 right-1 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full font-bold animate-pulse">3</span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-800 transition-all duration-200 group">
            <div className="bg-white p-1 rounded-full">
              <User size={18} className="text-red-800" />
            </div>
            <span className="hidden md:inline font-medium">Admin</span>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl hidden group-hover:block border border-red-300">
            <div className="p-2">
              <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-red-50 rounded transition-colors">Profile</button>
              <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-red-50 rounded transition-colors">Settings</button>
              <hr className="my-1 border-gray-200" />
              <button className="block w-full px-4 py-2 text-left text-red-800 hover:bg-red-50 rounded transition-colors flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
