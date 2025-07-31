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
import logo from "../../../assets/images/logo.png";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className={`h-screen ${isCollapsed ? "w-20" : "w-64"} bg-gradient-to-b from-red-950 via-red-900 to-red-800 text-white flex flex-col p-4 transition-all duration-300 shadow-2xl`}>
      
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="mb-4 self-end hover:bg-red-800 p-2 rounded-lg transition-colors">
        {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
      </button>

      {/* Logo and Title */}
      <div className={`flex items-center gap-3 mb-8 ${isCollapsed ? "justify-center" : ""}`}>
        <div className="bg-white p-2 rounded-lg">
          <img src={logo} alt="Trek App Logo" className="w-8 h-8 object-contain" />
        </div>
        {!isCollapsed && (
          <div>
            <h2 className="text-xl font-bold">Trek Admin</h2>
            <p className="text-red-300 text-xs">Management Panel</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-800 transition-all duration-200 group">
          <Home size={20} className="group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>

        <div>
          <button onClick={() => toggleMenu("packages")} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-red-800 transition-all duration-200 group">
            <div className="flex items-center gap-3">
              <Package size={20} className="group-hover:scale-110 transition-transform" />
              {!isCollapsed && <span>Trek Packages</span>}
            </div>
            {!isCollapsed && (openMenus.packages ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.packages && (
            <div className="ml-6 space-y-1 mt-2 bg-red-900 rounded-lg p-2">
              <Link to="/admin/addpackages" className="block p-2 rounded hover:bg-red-800 transition-colors">Add New</Link>
              <Link to="/admin/managepackages" className="block p-2 rounded hover:bg-red-800 transition-colors">Manage Packages</Link>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => toggleMenu("bookings")} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-red-800 transition-all duration-200 group">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="group-hover:scale-110 transition-transform" />
              {!isCollapsed && <span>Bookings</span>}
            </div>
            {!isCollapsed && (openMenus.bookings ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.bookings && (
            <div className="ml-6 space-y-1 mt-2 bg-red-900 rounded-lg p-2">
              <Link to="/admin/pending" className="block p-2 rounded hover:bg-red-800 transition-colors">Pending</Link>
              <Link to="/admin/confirmed" className="block p-2 rounded hover:bg-red-800 transition-colors">Confirmed</Link>
            </div>
          )}
        </div>

        <Link to="/admin/payments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-800 transition-all duration-200 group">
          <CreditCard size={20} className="group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span>Payments</span>}
        </Link>

        <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-800 transition-all duration-200 group">
          <Users size={20} className="group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span>Users</span>}
        </Link>

        <Link to="/admin/reviews" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-800 transition-all duration-200 group">
          <Star size={20} className="group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span>Reviews</span>}
        </Link>
      </nav>

      {/* Logout Button */}
      <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-800 transition-all duration-200 group mt-auto">
        <LogOut size={20} className="group-hover:scale-110 transition-transform" />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
