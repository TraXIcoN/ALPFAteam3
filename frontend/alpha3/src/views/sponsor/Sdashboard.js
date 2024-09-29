import React, { useState, useEffect } from "react";
import {
  Home,
  Inbox,
  CircleUserRoundIcon,
  Calendar,
  Building,
  View,
  PenBox,
  Upload,
  DoorOpen,
} from "lucide-react";
import alfalogo from "../../assets/alpfalogo.png"; // Import your logo here
import Eventlist from "./../candidate/Eventlist"; // Ensure this is the correct path for Eventlist
import Candidatelist from "./Candidatelist";
import ViewSponsorProfile from "./profile/ViewSponsorProfile";
import Cookies from "js-cookie";
import axios from "axios"; // Import axios for making API calls

const SolutionCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <Icon className="w-12 h-12 text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const SidebarItem = ({ icon: Icon, label, isNew, isActive, onClick }) => (
  <li
    className={`flex items-center px-4 py-2 cursor-pointer ${
      isActive ? "bg-gray-200" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <Icon className="mr-2" size={20} />
    <span>{label}</span>
    {isNew && (
      <span className="ml-2 text-xs bg-green-500 text-white px-1 rounded">
        New
      </span>
    )}
  </li>
);
const logout = () => {
  // Clear the authentication token and user ID from local storage
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");

  // Optionally, you can also clear any other user-related data
  // localStorage.removeItem("otherUserData");

  // Redirect to the login page or home page
  window.location.href = "/login"; // Change this to your desired route
};

const Sidebar = ({ activePage, setActivePage }) => {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null); // State to store the uploaded file name

  useEffect(() => {
    // Check local storage for uploaded file name
    const storedFileName = localStorage.getItem("uploadedFileName");
    if (storedFileName) {
      setUploadedFileName(storedFileName);
    }
  }, []);

  const menuItems = [
    { icon: CircleUserRoundIcon, label: "My Profile", path: "viewmyprofile" },
    { icon: Building, label: "Candidate List", path: "clist" },
    { icon: Calendar, label: "Career Fair Events", path: "events" },
    { icon: PenBox, label: "AiReview", path: "AiReview" },
    { icon: DoorOpen, label: "Logout", path: "logout" },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    const csrfToken = Cookies.get("csrftoken");
    if (!token) {
      console.error("User is not authenticated");
      return; // Prevent the upload if the user is not authenticated
    }
    if (file) {
      const formData = new FormData();
      formData.append("resume", file); // Append the file to the form data
      try {
        const response = await axios.post(
          `http://localhost:8000/upload/`, // Update with your Django upload URL
          formData, // Use formData instead of updatedEvent
          {
            headers: {
              Authorization: `Token ${token}`, // Include the token in the headers
              "X-CSRFToken": csrfToken,
              "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
            },
          }
        );

        if (response.status === 200) {
          // Check for successful response
          console.log("File uploaded successfully");
          localStorage.setItem("uploadedFileName", file.name); // Store the uploaded file name in local storage
          setUploadedFileName(file.name); // Update state
          setFile(null);
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error); // Handle any errors
      }
    }
  };

  return (
    <div className="w-64 bg-white shadow-md h-screen flex flex-col">
      <div className="p-4 flex items-center">
        <img src={alfalogo} alt="Logo" className="w-32 h-auto" />
      </div>
      <nav className="mt-4 flex-grow">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={activePage === item.path}
              onClick={() => setActivePage(item.path)}
            />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        {uploadedFileName && ( // Conditionally render the button if a file is uploaded
          <a
            href={`http://localhost:8000/media/resumes/${uploadedFileName}`} // Update with your Django media URL
            className="block w-full bg-green-500 text-white py-2 px-4 rounded text-center mb-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Uploaded Resume
          </a>
        )}
        <h3 className="font-semibold mb-2 flex items-center">
          <Upload className="mr-2" size={20} />
          Upload Resume
        </h3>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
        <button
          onClick={handleSubmit}
          className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const DashboardHome = () => (
  <div className="p-6 space-y-8">
    <h1 className="text-3xl font-bold text-center mb-8">
      Welcome to Your Sponsor Dashboard!
    </h1>
    <p className="text-center text-gray-700 mb-6">
      Your personalized hub for job searching and networking opportunities.
      Here, you'll find everything you need to enhance your career journey in
      one convenient location.
    </p>

    <h2 className="text-2xl font-bold text-center my-8">Features</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SolutionCard
        icon={CircleUserRoundIcon}
        title="My Profile"
        description="View and edit your personal profile. Keep your information up to date to maximize your visibility to potential employers."
      />
      <SolutionCard
        icon={Inbox}
        title="Inbox"
        description="Check your messages and notifications from employers and event organizers. Stay informed about new opportunities."
      />
      <SolutionCard
        icon={Calendar}
        title="Events"
        description="Explore upcoming events tailored for job seekers. Join workshops and networking sessions to connect with employers."
      />
      <SolutionCard
        icon={Building}
        title="Sponsors"
        description="Discover organizations that support our community. Learn about sponsorship opportunities and how they can help you."
      />
      <SolutionCard
        icon={PenBox}
        title="AiReview"
        description="Get AI-generated feedback on your resume and application materials. Improve your chances of landing interviews."
      />
    </div>
  </div>
);

const AiReview = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
    }}
  >
    <div>
      <h5 style={{ paddingBottom: 50 }}>Welcome to the AI Console</h5>
      <a
        href="http://localhost:8501"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#1976d2",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        Click here to access the AI console
      </a>
    </div>
  </div>
);

const PageContent = ({ page }) => {
  const pageComponents = {
    home: DashboardHome, // Use DashboardHome as the default home page
    viewmyprofile: ViewSponsorProfile,
    clist: Candidatelist,
    events: Eventlist,
    AiReview: AiReview,
    logout: logout,
  };

  const PageComponent =
    pageComponents[page] || (() => <div>Page not found</div>);

  return (
    <div className="p-6">
      <PageComponent />
    </div>
  );
};

const SponsorDashboard = () => {
  const [activePage, setActivePage] = useState("home"); // Set default page to "home"

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 overflow-auto">
        <PageContent page={activePage} />
      </div>
    </div>
  );
};

export default SponsorDashboard;
