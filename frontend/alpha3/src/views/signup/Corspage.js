import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Ensure this import is present

const Corspage = () => {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType) {
      console.log(`User type selected: ${userType}`);
      // Redirect based on user type
      if (userType === "candidate") {
        navigate("/candidate-signup"); // Redirect to candidate signup page
      } else if (userType === "sponsor") {
        navigate("/sponsor-signup"); // Redirect to sponsor signup page
      }
    } else {
      alert("Please select a user type");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="text-lg font-medium mb-4">
              Are you a Candidate or Sponsor?
            </p>
            <div className="flex flex-col">
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  value="candidate"
                  checked={userType === "candidate"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                Candidate
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="sponsor"
                  checked={userType === "sponsor"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                Sponsor
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-500 rounded-lg py-2 transition duration-300"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Corspage;
