
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      await axios.post(
        "http://localhost:5000/api/feedback",
        {
          ...formData,
          rating: Number(formData.rating)
        }
      );

      setStatus("Feedback submitted successfully!");
      setFormData({
        name: "",
        email: "",
        rating: "",
        message: ""
      });
    } catch (error) {
      setStatus(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="container">
      <div className="feedback-card">
        <h1>Feedback Form</h1>
        <p>We value your feedback!</p>

        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Average</option>
            <option value="1">1 - Poor</option>
          </select>

          <label>Your Feedback</label>
          <textarea
            name="message"
            placeholder="Write your feedback..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Feedback</button>
        </form>

        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}

export default App;
