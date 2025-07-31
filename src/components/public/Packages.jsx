import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../common/customer/Navbar";
import Footer from "../common/customer/Footer";
import PackageCard from "../common/customer/PackageCard";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("/api/v1/package");
        setPackages(res.data);
      } catch (err) {
        setError("Failed to load packages. Please try again later.");
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <p className="text-center py-10">Loading packages...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Explore Our Tour Packages
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} packageData={pkg} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Packages; 