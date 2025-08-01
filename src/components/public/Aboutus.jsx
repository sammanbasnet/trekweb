import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your trusted partner for unforgettable trek experiences across the Himalayas and beyond.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="bg-white bg-opacity-90 px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold text-lg text-gray-800">500+</span> <span className="text-gray-700">Happy Trekkers</span>
            </div>
            <div className="bg-white bg-opacity-90 px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold text-lg text-gray-800">50+</span> <span className="text-gray-700">Trek Routes</span>
            </div>
            <div className="bg-white bg-opacity-90 px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold text-lg text-gray-800">10+</span> <span className="text-gray-700">Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our goal is to provide trekkers with authentic, safe, and
              unforgettable journeys. We believe in responsible tourism that
              respects local cultures and environments.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Expert guides with extensive local knowledge</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Customized trek packages to suit your needs</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Commitment to safety and quality</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">24/7 customer support</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Trek in Nepal"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Trekking Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Everest Base Camp"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='256' viewBox='0 0 400 256'%3E%3Crect width='400' height='256' fill='%23f3f4f6'/%3E%3Ctext x='200' y='128' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EEverest Base Camp%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Everest Base Camp</h3>
                <p className="text-sm opacity-90">The ultimate trekking experience</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="http://localhost:3000/uploads/IMG-1754001402448.png" 
                alt="Annapurna Circuit"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='256' viewBox='0 0 400 256'%3E%3Crect width='400' height='256' fill='%23f3f4f6'/%3E%3Ctext x='200' y='128' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EAnnapurna Circuit%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Annapurna Circuit</h3>
                <p className="text-sm opacity-90">Breathtaking mountain views</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Manaslu Trek"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='256' viewBox='0 0 400 256'%3E%3Crect width='400' height='256' fill='%23f3f4f6'/%3E%3Ctext x='200' y='128' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EManaslu Trek%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Manaslu Trek</h3>
                <p className="text-sm opacity-90">Off the beaten path</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 -mx-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our dedicated team of professionals is here to ensure you have the best possible experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl font-bold">SJB</span>
                </div>
                <h4 className="text-xl font-semibold text-center mb-2">Samman Jung Basnet</h4>
                <p className="text-red-600 font-medium text-center mb-4">CEO</p>
                <p className="text-gray-600 text-center text-sm">
                  Leading our company with vision and expertise to deliver exceptional trekking experiences.
                </p>
              </div>
              {/* Team Member 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl font-bold">SJB</span>
                </div>
                <h4 className="text-xl font-semibold text-center mb-2">Samman Jung Basnet</h4>
                <p className="text-red-600 font-medium text-center mb-4">Lead Guide</p>
                <p className="text-gray-600 text-center text-sm">
                  Expert guide with extensive knowledge of Himalayan trails and local culture.
                </p>
              </div>
              {/* Team Member 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl font-bold">SJB</span>
                </div>
                <h4 className="text-xl font-semibold text-center mb-2">Samman Jung Basnet</h4>
                <p className="text-red-600 font-medium text-center mb-4">Customer Support</p>
                <p className="text-gray-600 text-center text-sm">
                  Providing 24/7 support to ensure your trekking journey is smooth and enjoyable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join us for an unforgettable trekking experience in the Himalayas.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/packages" className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-block">
              Explore Packages
            </Link>
            <Link to="/contact" className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs; 
