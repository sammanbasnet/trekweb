import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Package,
  Star,
  Users
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Confirmed from "../../private/bookings/Confirmed";
import Pending from "../../private/bookings/Pending";
import AddPackages from "../../private/packages/AddPackages";
import ManagePackages from "../../private/packages/ManagePackages";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("role"); // Remove token from storage
    window.location.href = "/login"; // Correct way to redirect
};


  return (
    <div className={`h-screen ${isCollapsed ? "w-20" : "w-64"} bg-gray-900 text-white flex flex-col p-4 transition-all duration-300`}>
      
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="mb-4 self-end">
        {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
      </button>

      <h2 className={`text-xl font-bold mb-6 ${isCollapsed ? "hidden" : "block"}`}>Admin Panel</h2>

      <nav className="flex-1 space-y-2">
        <Link to="/admin/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700">
          <Home size={20} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>

        <div>
          <button onClick={() => toggleMenu("packages")} className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700">
            <div className="flex items-center gap-3">
              <Package size={20} />
              {!isCollapsed && <span>Trek Packages</span>}
            </div>
            {!isCollapsed && (openMenus.packages ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.packages && (
            <div className="ml-6 space-y-1 mt-1">
              <Link onClick={AddPackages} to="/admin/addpackages" className="block p-2 rounded hover:bg-gray-700">Add New</Link>
              <Link onClick={ManagePackages} to="/admin/managepackages" className="block p-2 rounded hover:bg-gray-700">Manage Packages</Link>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => toggleMenu("bookings")} className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700">
            <div className="flex items-center gap-3">
              <Calendar size={20} />
              {!isCollapsed && <span>Bookings</span>}
            </div>
            {!isCollapsed && (openMenus.bookings ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.bookings && (
            <div className="ml-6 space-y-1 mt-1">
              <Link onClick={Pending} to="/admin/pending" className="block p-2 rounded hover:bg-gray-700">Pending</Link>
              <Link onClick={Confirmed} to="/admin/confirmed" className="block p-2 rounded hover:bg-gray-700">Confirmed</Link>
            </div>
          )}
        </div>

        <Link to="/admin/payments" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700">
          <CreditCard size={20} />
          {!isCollapsed && <span>Payments</span>}
        </Link>

        <Link to="/admin/users" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700">
          <Users size={20} />
          {!isCollapsed && <span>Users</span>}
        </Link>

        <Link to="/admin/reviews" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700">
          <Star size={20} />
          {!isCollapsed && <span>Reviews</span>}
        </Link>
      </nav>

      {/* Logout Button */}
      <button onClick={handleLogout} className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-700">
        <LogOut size={20} />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
