import React, { useState } from 'react';
import { CircleUserRoundIcon, List, Calendar, Upload, File } from 'lucide-react';
import alfalogo from '../../assets/alpfalogo.png';
import Eventlist from '.././candidate/Eventlist';
import CandidateList from './Candidatelist';

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <li
    className={`flex items-center px-4 py-2 cursor-pointer ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <Icon className="mr-2" size={20} />
    <span>{label}</span>
  </li>
);

const Sidebar = ({ activePage, setActivePage }) => {
  const [file, setFile] = useState(null);

  const menuItems = [
    { icon: CircleUserRoundIcon, label: 'My Profile', path: 'viewmyprofile' },
    { icon: List, label: 'Candidate List', path: 'candidatelist' },
    { icon: Calendar, label: 'Career Fair Events', path: 'careerfairevents' },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      console.log('Uploading file:', file.name);
      setFile(null);
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
        <h3 className="font-semibold mb-2 flex items-center">
          <File className="mr-2" size={20} />
          Upload File
        </h3>
        <div className="flex items-center border border-gray-300 rounded p-4">
          <Upload className="mr-4 text-gray-400" size={40} />
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
        </div>
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

const PageContent = ({ page }) => {
  const pageComponents = {
    viewmyprofile: () => <div>Profile Page Content</div>,
    candidatelist: CandidateList,
    careerfairevents: Eventlist, // Link to Eventlist
  };

  const PageComponent = pageComponents[page] || (() => <div>Page not found</div>);

  return (
    <div className="p-6">
      <PageComponent />
    </div>
  );
};

const Sdashboard = () => {
  const [activePage, setActivePage] = useState('viewmyprofile');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 overflow-auto">
        <PageContent page={activePage} />
      </div>
    </div>
  );
};

export default Sdashboard;
