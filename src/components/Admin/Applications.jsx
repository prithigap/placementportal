/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import ApplicationItem from "./ApplicationItem";
import JobAppContext from "../../context/applications/JobAppContext";

const Applications = () => {
  const navigate = useNavigate();
  const context = useContext(JobAppContext);
  const { applications, fetchAllApps } = context;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser.role === 'admin') {
          fetchAllApps();
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate('/login'); // If parsing fails, redirect to login
      }
    } else {
      navigate('/login');
    }
  }, [navigate, fetchAllApps]); // Including navigate and fetchAllApps in dependencies

  return (
    <div className="py-2">
      <div className="d-flex justify-content-center align-items-center">
        <h2 className="my-4">All Applications</h2>
      </div>
      {applications.length === 0 && <h6 className="py-2 container">No applications applied!</h6>}
      <div className="row g-1 d-flex justify-content-center overflow-auto m-2" style={{ maxHeight: '70vh', minHeight: '60vh' }}>
        {applications.map((application) => {
          return <ApplicationItem key={application.id} application={application} />; // Use application.id instead of application.aid
        })}
      </div>
    </div>
  );
};

export default Applications;
