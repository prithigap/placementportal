/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Notfound from './components/Notfound';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import ACompanies from './components/Admin/Companies';
import SCompanies from './components/Student/Companies';
import AAnnouncements from './components/Admin/Announcements';
import SAnnouncements from './components/Student/Announcements';
import AApplications from './components/Admin/Applications';
import SApplications from './components/Student/Applications';
import AStudents from './components/Admin/Students';
import Profile from './components/Profile'; // Import the Profile component
import AnnounceState from './context/announcements/AnnounceState';
import JobAppState from './context/applications/JobAppState';

function App() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null); // State to track user role

  useEffect(() => {
    // Function to update user role from localStorage
    const updateUserRole = () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserRole(parsedUser.role); // Set user role from parsed user object
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    };

    updateUserRole(); // Update user role on component mount

    // Event listener for changes in localStorage to update user role dynamically
    const handleStorageChange = () => {
      updateUserRole(); // Call update function when localStorage changes
    };

    window.addEventListener('storage', handleStorageChange); // Listen for localStorage changes

    return () => {
      window.removeEventListener('storage', handleStorageChange); // Cleanup listener on component unmount
    };
  }, [navigate]);

  return (
    <>
      <AnnounceState>
        <JobAppState>
          <Navbar userRole={userRole} /> {/* Pass userRole to Navbar */}
          <div className=''>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login setUserRole={setUserRole} />} /> {/* Pass setUserRole */}
              <Route path='/contact-us' element={<Contact />} />
              <Route path='/about' element={<About />} />
              <Route path='/profile' element={<Profile />} /> {/* Profile route */}

              {userRole === 'student' && (
                <>
                  <Route path='/student/announcements' element={<SAnnouncements />} />
                  <Route path='/student/applications' element={<SApplications />} />
                  <Route path='/student/companies' element={<SCompanies />} />
                </>
              )}

              {userRole === 'admin' && (
                <>
                  <Route path='/admin/announcements' element={<AAnnouncements />} />
                  <Route path='/admin/applications' element={<AApplications />} />
                  <Route path='/admin/companies' element={<ACompanies />} />
                  <Route path='/admin/students' element={<AStudents />} />
                </>
              )}

              <Route path='*' element={<Notfound />} />
            </Routes>
          </div>
        </JobAppState>
      </AnnounceState>
    </>
  );
}

export default App;
