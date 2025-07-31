import React from "react";
import { FaBook, FaBox, FaClipboardList, FaDollarSign, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  // Mock Data (Replace with API Fetch)
  const stats = [
    { id: 1, title: "Total Users", value: "1,240", icon: <FaUsers size={24} />, color: "bg-red-500" },
    { id: 2, title: "Total Packages", value: "58", icon: <FaBox size={24} />, color: "bg-red-500" },
    { id: 3, title: "Total Bookings", value: "3,450", icon: <FaClipboardList size={24} />, color: "bg-yellow-500" },
    { id: 4, title: "Total Revenue", value: "$12,480", icon: <FaDollarSign size={24} />, color: "bg-pink-500" },
  ];

  const recentBookings = [
    { id: 1, customer: "John Doe", package: "Paris Getaway", date: "2024-08-15", status: "Confirmed" },
    { id: 2, customer: "Jane Smith", package: "Tokyo Reviera", date: "2024-08-14", status: "Pending" },
    { id: 3, customer: "Mike Johnson", package: "New York City Tour", date: "2024-08-13", status: "Canceled" },
    { id: 4, customer: "Emily Davis", package: "London Bridge", date: "2024-08-12", status: "Confirmed" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin!</h1>
        <p className="text-gray-600 mt-1">Here's a summary of your dashboard.</p>
      </div>

      {/* Dashboard Title */}
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className={`p-6 rounded-lg text-white shadow-md flex items-center gap-4 ${stat.color}`}>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm opacity-90">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3 px-4 text-sm font-semibold">CUSTOMER</th>
              <th className="py-3 px-4 text-sm font-semibold">PACKAGE</th>
              <th className="py-3 px-4 text-sm font-semibold">DATE</th>
              <th className="py-3 px-4 text-sm font-semibold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{booking.customer}</td>
                <td className="py-3 px-4 text-sm">{booking.package}</td>
                <td className="py-3 px-4 text-sm">{booking.date}</td>
                <td className={`py-2 font-semibold ${booking.status === "Confirmed" ? "text-red-500" : booking.status === "Pending" ? "text-yellow-500" : "text-red-500"}`}>
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
