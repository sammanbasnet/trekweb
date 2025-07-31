import React from "react";
import { FaBook, FaBox, FaClipboardList, FaDollarSign, FaUsers, FaMountain } from 'react-icons/fa';

const Dashboard = () => {
  // Mock Data (Replace with API Fetch)
  const stats = [
    { id: 1, title: "Total Users", value: "1,240", icon: <FaUsers size={24} />, color: "bg-gradient-to-r from-red-500 to-red-600", change: "+12%" },
    { id: 2, title: "Total Packages", value: "58", icon: <FaBox size={24} />, color: "bg-gradient-to-r from-orange-500 to-orange-600", change: "+5%" },
    { id: 3, title: "Total Bookings", value: "3,450", icon: <FaClipboardList size={24} />, color: "bg-gradient-to-r from-yellow-500 to-yellow-600", change: "+18%" },
    { id: 4, title: "Total Revenue", value: "$12,480", icon: <FaDollarSign size={24} />, color: "bg-gradient-to-r from-green-500 to-green-600", change: "+23%" },
  ];

  const recentBookings = [
    { id: 1, customer: "John Doe", package: "Everest Base Camp Trek", date: "2024-08-15", status: "Confirmed" },
    { id: 2, customer: "Jane Smith", package: "Annapurna Circuit Trek", date: "2024-08-14", status: "Pending" },
    { id: 3, customer: "Mike Johnson", package: "Manaslu Circuit Trek", date: "2024-08-13", status: "Canceled" },
    { id: 4, customer: "Emily Davis", package: "Tilicho Lake Trek", date: "2024-08-12", status: "Confirmed" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl rounded-xl p-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full">
            <FaMountain size={32} className="text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Admin!</h1>
            <p className="text-red-100 mt-2">Here's a summary of your trekking business dashboard.</p>
          </div>
        </div>
      </div>

      {/* Dashboard Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className={`p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                {stat.icon}
              </div>
              <span className="text-sm font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm opacity-90 mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white shadow-xl rounded-xl p-6 border border-red-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-2 rounded-lg">
            <FaClipboardList size={20} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-red-100 text-gray-600">
                <th className="py-4 px-4 text-sm font-semibold">CUSTOMER</th>
                <th className="py-4 px-4 text-sm font-semibold">PACKAGE</th>
                <th className="py-4 px-4 text-sm font-semibold">DATE</th>
                <th className="py-4 px-4 text-sm font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium">{booking.customer}</td>
                  <td className="py-4 px-4 text-sm">{booking.package}</td>
                  <td className="py-4 px-4 text-sm">{booking.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "Confirmed" 
                        ? "bg-green-100 text-green-800" 
                        : booking.status === "Pending" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2">Add New Package</h3>
          <p className="text-red-100 text-sm mb-4">Create exciting new trek packages for your customers</p>
          <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors">
            Add Package
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2">View Bookings</h3>
          <p className="text-orange-100 text-sm mb-4">Check and manage all customer bookings</p>
          <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
            View Bookings
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <p className="text-green-100 text-sm mb-4">Handle customer accounts and permissions</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
