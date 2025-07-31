import React, { useState, useEffect } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    packageId: "",
  });

  // Fetch packages and load reviews from localStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching packages...");
        const packagesRes = await axios.get("/api/v1/package");
        console.log("Packages response:", packagesRes.data);
        setPackages(packagesRes.data);
        
        // Load reviews from localStorage (for admin dashboard)
        const savedReviews = localStorage.getItem('trekReviews');
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        } else {
          // Initial mock reviews
          const initialReviews = [
            {
              _id: 1,
              name: "Aarav Sharma",
              rating: 5,
              comment: "Amazing experience! The trip to Everest Base Camp was unforgettable.",
              packageName: "Everest Base Camp Trek",
              status: "Approved"
            },
            {
              _id: 2,
              name: "Sita Rana",
              rating: 4.5,
              comment: "Great service and well-organized tours. Highly recommended!",
              packageName: "Annapurna Circuit Trek",
              status: "Approved"
            },
          ];
          setReviews(initialReviews);
          localStorage.setItem('trekReviews', JSON.stringify(initialReviews));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error details:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.comment && newReview.packageId) {
      setSubmitting(true);
      try {
        // Get package name for the review
        const selectedPackage = packages.find(pkg => pkg._id === newReview.packageId);
        
        const reviewData = {
          _id: Date.now(), // Generate unique ID
          name: newReview.name,
          rating: newReview.rating,
          comment: newReview.comment,
          packageId: newReview.packageId,
          packageName: selectedPackage?.title || "Unknown Package",
          status: "Pending", // Default status for new reviews
          createdAt: new Date().toISOString()
        };

        // Add the new review to local state and localStorage
        const updatedReviews = [...reviews, reviewData];
        setReviews(updatedReviews);
        localStorage.setItem('trekReviews', JSON.stringify(updatedReviews));
        
        // Reset form
        setNewReview({ name: "", rating: 0, comment: "", packageId: "" });
        
        alert("Review submitted successfully! It will be reviewed by our team.");
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Error submitting review. Please try again.");
      } finally {
        setSubmitting(false);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <p className="text-center text-lg">Loading reviews...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Customer Reviews</h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          See what our trekkers say about their experiences in Nepal!
        </p>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.filter(review => review.status === "Approved").map((review) => (
            <div key={review._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{review.packageName}</p>
              <div className="flex items-center my-2">
                {Array.from({ length: 5 }, (_, index) => {
                  if (index + 1 <= review.rating) {
                    return <FaStar key={index} className="text-yellow-500 text-lg" />;
                  } else if (index + 0.5 === review.rating) {
                    return <FaStarHalfAlt key={index} className="text-yellow-500 text-lg" />;
                  } else {
                    return <FaRegStar key={index} className="text-gray-400 text-lg" />;
                  }
                })}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Package</label>
              <select
                name="packageId"
                value={newReview.packageId}
                onChange={(e) => setNewReview({ ...newReview, packageId: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              >
                <option value="">Select a Package</option>
                {packages.map((pkg) => (
                  <option key={pkg._id} value={pkg._id}>
                    {pkg.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Rating</label>
              <select
                name="rating"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              >
                <option value="">Select a Rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Comment</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Share your experience..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`bg-red-800 text-white py-2 px-6 rounded-md transition duration-300 ${
                submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
              }`}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;
