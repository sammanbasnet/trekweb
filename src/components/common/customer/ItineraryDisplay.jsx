import React from "react";
import { FaMapMarkerAlt, FaClock, FaMountain, FaCampground, FaHiking, FaCamera } from "react-icons/fa";

const ItineraryDisplay = ({ itinerary, title = "Itinerary", showDayNumbers = true }) => {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FaMountain className="mr-2 text-blue-600" />
          {title}
        </h3>
        <p className="text-gray-500 italic">No itinerary available for this package.</p>
      </div>
    );
  }

  // Function to get appropriate icon based on activity
  const getActivityIcon = (activity) => {
    // Convert activity to string and handle different data types
    const activityString = typeof activity === 'string' ? activity : 
                          typeof activity === 'object' && activity.title ? activity.title :
                          typeof activity === 'object' && activity.description ? activity.description :
                          String(activity || '');
    
    const lowerActivity = activityString.toLowerCase();
    
    if (lowerActivity.includes('trek') || lowerActivity.includes('hike')) return <FaHiking className="text-green-600" />;
    if (lowerActivity.includes('camp')) return <FaCampground className="text-orange-600" />;
    if (lowerActivity.includes('photo') || lowerActivity.includes('view')) return <FaCamera className="text-purple-600" />;
    if (lowerActivity.includes('mountain') || lowerActivity.includes('peak')) return <FaMountain className="text-blue-600" />;
    return <FaMapMarkerAlt className="text-red-600" />;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FaMountain className="mr-3 text-blue-600 text-2xl" />
        {title}
      </h3>
      
      <div className="space-y-4">
        {itinerary.map((item, index) => {
          // Handle different data formats
          let dayData = item;
          if (typeof item === 'string') {
            try {
              dayData = JSON.parse(item);
            } catch {
              dayData = { title: item, description: item };
            }
          }

          const dayTitle = dayData.title || dayData || `Day ${index + 1}`;
          const dayDescription = dayData.description || dayData || item;

          return (
            <div key={index} className="relative">
              {/* Day number badge */}
              {showDayNumbers && (
                <div className="absolute -left-2 -top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  Day {index + 1}
                </div>
              )}
              
              {/* Activity card */}
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(dayTitle)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg mb-1">
                      {dayTitle}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {dayDescription}
                    </p>
                  </div>
                </div>
                
                {/* Activity tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    <FaClock className="inline mr-1" />
                    Full Day
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    <FaMountain className="inline mr-1" />
                    Adventure
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary footer */}
      <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center">
            <FaClock className="mr-1" />
            {itinerary.length} Days Total
          </span>
          <span className="flex items-center">
            <FaMountain className="mr-1" />
            Adventure Package
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay; 