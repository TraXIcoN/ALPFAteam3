import React, { useState } from "react";
import {
  Home,
  Inbox,
  CircleUserRoundIcon,
  Calendar,
  Building,
  View,
  PenBox,
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

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { icon: CircleUserRoundIcon, label: "My Profile", path: "viewmyprofile" },
    { icon: Inbox, label: "Inbox", path: "inbox" },
    { icon: Calendar, label: "Events", path: "events" }, // Update path to match the key in PageContent
    { icon: Building, label: "Sponsors", path: "sponsors" },
    { icon: PenBox, label: "AiReview", path: "AiReview" },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-screen">
      <div className="p-4 flex items-center">
        <img src={alfalogo} alt="Logo" className="w-32 h-auto" />{" "}
        {/* Add your logo here */}
      </div>
      <nav className="mt-4">
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
    events: Eventlist, // Directly reference the imported Eventlist component
    sponsors: () => <div>Employers Page Content</div>,
    AiReview: AiReview,
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
