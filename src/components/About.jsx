/* eslint-disable no-unused-vars */
import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const PlacementManagement = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:placementportal@example.com'; // Updated email
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/placementportal/', '_blank'); // Updated Instagram link
  };

  const handleLinkedinClick = () => {
    window.open('https://www.linkedin.com/in/placement-portal/', '_blank'); // Updated LinkedIn link
  };
  
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="text-center mb-5">
            <h2 className="mb-3">About Placement Management System</h2>
            <p className="lead">Welcome to the Placement Management System, a comprehensive platform designed to streamline the placement process and enhance student recruitment activities. Our goal is to provide a seamless and efficient experience for both students and recruiters, facilitating successful placements and career opportunities.</p>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="feature text-center">
                <h3>Secure Authentication</h3>
                <p>The Placement Management System ensures secure authentication mechanisms, safeguarding user data and account access.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature text-center">
                <h3>Job Placement Support</h3>
                <p>The Placement Management System offers extensive support for job placements, connecting students with leading companies and organizations.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature text-center">
                <h3>Never Miss Any Opportunity</h3>
                <p>Our platform ensures that you never miss any placement opportunity by providing timely updates about job openings and recruitment drives.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <p>The Placement Portal is designed to provide a robust and efficient system for managing recruitment activities and student placements. Our goal is to connect students with top companies and ensure they don't miss any career opportunities.</p>
            <p>With state-of-the-art infrastructure and a focus on holistic development, our platform empowers students to take charge of their career paths while fostering leadership, teamwork, and ethical values.</p>
          </div>
        </div>
        <div className="connect-with-us text-center mt-5">
          <h2 className='py-3'>Connect With Us</h2>
          <div className="social-icons">
            <button className="btn mx-1" onClick={handleInstagramClick}>
              <FaInstagram size={30} />
            </button>
            <button className="btn mx-1" onClick={handleLinkedinClick}>
              <FaLinkedin size={30} />
            </button>
            <button className="btn mx-1" onClick={handleEmailClick}>
              <FaEnvelope size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlacementManagement;
