/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import JobAppContext from "./JobAppContext";
import { useState } from "react";

const JobAppState = (props) => {
    // Update the host to point to your local FastAPI backend
    const host = 'http://localhost:8000'; // Change this to your local FastAPI URL
    const initially = [];

    const [applications, setApplications] = useState(initially);
    const [companies, setCompanies] = useState(initially);
    const [student, setStudent] = useState(null); // Initialize student state as null
    const [checkit, setCheckit] = useState(initially);

    // Get applications for the logged-in user
    const fetchApps = async () => {
        try {
            const response = await fetch(`${host}/api/applications/fetchapplications`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }
            const json = await response.json();
            setApplications(json);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    // Get all applications (for admin)
    const fetchAllApps = async () => {
        try {
            const response = await fetch(`${host}/api/applications/fetchall`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch all applications');
            }
            const allapps = await response.json();
            setApplications(allapps);
        } catch (error) {
            console.error("Error fetching all applications:", error);
        }
    };

    // Submit an application
    const submitApp = async (id) => {
        try {
            const response = await fetch(`${host}/api/applications/submitapplications/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to submit application');
            }
            const application = await response.json();
            setApplications(applications.concat(application)); // Update applications state
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    // Check if user has already applied to a specific company
    const checkApp = async (id) => {
        try {
            const response = await fetch(`${host}/api/applications/checkapplications/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to check application');
            }
            const check = await response.json();
            setCheckit({ id, check });
        } catch (error) {
            console.error("Error checking application:", error);
        }
    };

    // Get all companies
    const fetchCompanies = async () => {
        try {
            const response = await fetch(`${host}/api/jobs/fetchjobs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch companies');
            }
            const json = await response.json();
            setCompanies(json);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    // Get student data
    const fetchStudent = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getdata`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }
            const stu = await response.json();
            setStudent(stu.user); // Ensure the user object is set correctly
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    // Add Company
    const addCompany = async (type, companyName, requiredGPA, closingDate, batch) => {
        try {
            const response = await fetch(`${host}/api/jobs/addjobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ type, companyName, requiredGPA, closingDate, batch }),
            });
            if (!response.ok) {
                throw new Error('Failed to add company');
            }
            const company = await response.json();
            setCompanies(companies.concat(company));
        } catch (error) {
            console.error("Error adding company:", error);
        }
    };

    // Delete Company
    // JobAppState.jsx

const deleteCompany = async (id) => {
    try {
        console.log("Attempting to delete company with ID:", id); // Confirm ID before making request
        if (!id) {
            throw new Error("ID is undefined");
        }

        const response = await fetch(`${host}/api/jobs/deletejobs/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete company');
        }
        
        const newCompanies = companies.filter((company) => company.id !== id && company._id !== id);
        setCompanies(newCompanies);
    } catch (error) {
        console.error("Error deleting company:", error);
    }
};

    

    return (
        <JobAppContext.Provider
            value={{
                applications,
                fetchAllApps,
                fetchApps,
                student,
                fetchStudent,
                checkit,
                checkApp,
                companies,
                fetchCompanies,
                addCompany,
                deleteCompany,
                submitApp,
            }}
        >
            {props.children}
        </JobAppContext.Provider>
    );
};

export default JobAppState;
