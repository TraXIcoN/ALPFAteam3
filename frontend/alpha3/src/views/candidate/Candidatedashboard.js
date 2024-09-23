import React, { useState } from "react";
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
import Eventlist from "./Eventlist"; // Ensure this is the correct path for Eventlist
import ViewProfile from "./profile/Viewprofile";

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

  // Optionally, you can also clear any other user-related data
  // localStorage.removeItem("otherUserData");

  // Redirect to the login page or home page
  window.location.href = "/login"; // Change this to your desired route
};

const Sidebar = ({ activePage, setActivePage }) => {
  const [file, setFile] = useState(null);

  const menuItems = [
    { icon: CircleUserRoundIcon, label: "My Profile", path: "viewmyprofile" },
    { icon: Inbox, label: "Inbox", path: "inbox" },
    { icon: Calendar, label: "Events", path: "events" }, // Update path to match the key in PageContent
    { icon: Building, label: "Sponsors", path: "sponsors" },
    { icon: PenBox, label: "AiReview", path: "AiReview" },
    { icon: DoorOpen, label: "Logout", path: "logout" },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = () => {
    if (file) {
      // Here you would typically handle the file upload
      console.log("Uploading file:", file.name);
      // Reset the file state after upload
      setFile(null);
    }
  };

  return (
    <div className="w-64 bg-white shadow-md h-screen flex flex-col">
      <div className="p-4 flex items-center">
        <img src={alfalogo} alt="Logo" className="w-32 h-auto" />{" "}
        {/* Add your logo here */}
      </div>
      <nav className="mt-4 flex-grow">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              isNew={item.isNew}
              isActive={activePage === item.path}
              onClick={() => setActivePage(item.path)}
            />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
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

const AiReview = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Full viewport height
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
    viewmyprofile: ViewProfile,
    inbox: () => <div>Inbox Page Content</div>,
    events: Eventlist,
    sponsors: () => <div>Employers Page Content</div>,
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

const Candidatedashboard = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 overflow-auto">
        <PageContent page={activePage} />
      </div>
    </div>
  );
};

export default Candidatedashboard;
