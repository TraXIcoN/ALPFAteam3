import React, { useState } from 'react';
import { Home, Inbox, CircleUserRoundIcon, Calendar, Building } from 'lucide-react';
import alfalogo from '../../assets/alpfalogo.png'; // Import your logo here
import Eventlist from './Eventlist'; // Ensure this is the correct path for Eventlist

const SidebarItem = ({ icon: Icon, label, isNew, isActive, onClick }) => (
  <li 
    className={`flex items-center px-4 py-2 cursor-pointer ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <Icon className="mr-2" size={20} />
    <span>{label}</span>
    {isNew && <span className="ml-2 text-xs bg-green-500 text-white px-1 rounded">New</span>}
  </li>
);

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { icon: Home, label: 'Home', path: 'home' },
    { icon: CircleUserRoundIcon, label: 'My Profile', path: 'viewmyprofile' },
    { icon: Inbox, label: 'Inbox', path: 'inbox' },
    { icon: Calendar, label: 'Events', path: 'events' }, // Update path to match the key in PageContent
    { icon: Building, label: 'Sponsors', path: 'sponsors' },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-screen">
      <div className="p-4 flex items-center">
        <img src={alfalogo} alt="Logo" className="w-32 h-auto" /> {/* Add your logo here */}
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

const PageContent = ({ page }) => {
  const pageComponents = {
    home: () => <div>Home Page Content</div>,
    viewmyprofile: () => <div>Profile Page Content</div>,
    inbox: () => <div>Inbox Page Content</div>,
    events: Eventlist, // Directly reference the imported Eventlist component
    sponsors: () => <div>Employers Page Content</div>,
  };

  const PageComponent = pageComponents[page] || (() => <div>Page not found</div>);

  return (
    <div className="p-6">
      
      <PageComponent />
    </div>
  );
};

const Candidatedashboard = () => {
  const [activePage, setActivePage] = useState('home');

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
