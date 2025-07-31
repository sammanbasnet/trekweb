import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load reviews from localStorage
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const savedReviews = localStorage.getItem('trekReviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        // Initial mock reviews if none exist
        const initialReviews = [
          { 
            _id: 1, 
            name: "John Doe", 
            packageName: "Everest Base Camp Trek", 
            rating: 5, 
            comment: "Amazing experience, loved the trip!", 
            status: "Approved" 
          },
          { 
            _id: 2, 
            name: "Jane Smith", 
            packageName: "Annapurna Circuit Trek", 
            rating: 4, 
            comment: "Beautiful destination, but the hotel could be better.", 
            status: "Pending" 
          },
          { 
            _id: 3, 
            name: "Michael Lee", 
            packageName: "Manaslu Circuit Trek", 
            rating: 3, 
            comment: "Good trip, but the schedule was too packed.", 
            status: "Approved" 
          },
          { 
            _id: 4, 
            name: "Sarah Johnson", 
            packageName: "Tilicho Lake Trek", 
            rating: 5, 
            comment: "Incredible views and excellent guide service!", 
            status: "Pending" 
          },
        ];
        setReviews(initialReviews);
        localStorage.setItem('trekReviews', JSON.stringify(initialReviews));
      }
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = async (reviewId) => {
    try {
      // Update local state and localStorage
      const updatedReviews = reviews.map(review => 
        review._id === reviewId 
          ? { ...review, status: "Approved" }
          : review
      );
      setReviews(updatedReviews);
      localStorage.setItem('trekReviews', JSON.stringify(updatedReviews));
      alert("Review approved successfully!");
    } catch (error) {
      console.error("Error approving review:", error);
      alert("Error approving review. Please try again.");
    }
  };

  const handleReject = async (reviewId) => {
    try {
      // Remove from local state and localStorage
      const updatedReviews = reviews.filter(review => review._id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem('trekReviews', JSON.stringify(updatedReviews));
      alert("Review rejected and deleted successfully!");
    } catch (error) {
      console.error("Error rejecting review:", error);
      alert("Error rejecting review. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <p className="text-center text-lg">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Customer Reviews</h2>

      {/* Reviews Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Package</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Review</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-700">{review.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{review.packageName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <span key={index} className="text-yellow-500">&#9733;</span> // Display star icons for rating
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{review.comment}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      review.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {review.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {review.status === "Pending" ? (
                    <button
                      className="text-green-500 hover:text-green-700 mr-2"
                      onClick={() => handleApprove(review._id)}
                      title="Approve Review"
                    >
                      <FaCheck />
                    </button>
                  ) : (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleReject(review._id)}
                      title="Delete Review"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews found.</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
