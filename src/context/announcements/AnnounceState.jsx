/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AnnounceContext from "./AnnounceContext";
import { useState } from "react";

const AnnouncementState = (props) => {
    const host = 'krishnaprasathk-backend.hf.space/'; // Update this with your FastAPI backend URL
    const initially = [];

    const [announcements, setAnnouncements] = useState(initially);
    const [students, setStudents] = useState(initially);

    // Get all announcements
    const fetchAnnouncements = async () => {
        try {
            const response = await fetch(`${host}/api/announcements`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch announcements');
            }
            const json = await response.json();
            setAnnouncements(json); // Set announcements data
        } catch (error) {
            console.error("Error fetching announcements:", error.message); // Improved error logging
        }
    };

    // Get all students
    const fetchStudents = async () => {
        try {
            const response = await fetch(`${host}/api/students/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const studentsData = await response.json();
            setStudents(studentsData); // Set students data
        } catch (error) {
            console.error("Error fetching students:", error.message); // Improved error logging
        }
    };

    // Add Announcement
    const addAnnouncement = async (title, description) => {
        try {
            const response = await fetch(`${host}/api/announcements`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });
            if (!response.ok) {
                throw new Error('Failed to add announcement');
            }
            const announcement = await response.json();
            setAnnouncements(announcements.concat(announcement)); // Add new announcement to state
        } catch (error) {
            console.error("Error adding announcement:", error.message); // Improved error logging
        }
    };

    // Delete Announcement (no authorization)
    const deleteAnnouncement = async (id) => {
        console.log("Sending delete request for announcement ID:", id); // Log before sending request
    
        try {
            const response = await fetch(`${host}/api/announcements/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                console.error("Delete request failed with status:", response.status); // Log response status
                return response;
            }
    
            const newAnnouncements = announcements.filter((announcement) => announcement.id !== id);
            setAnnouncements(newAnnouncements); // Update the state if delete was successful
    
            console.log("Announcement successfully deleted:", id); // Log success message
            return response;
        } catch (error) {
            console.error("Error in deleteAnnouncement function:", error.message); // Log any fetch errors
            throw error;
        }
    };
    

    // Edit Announcement (no authorization)
    const editAnnouncement = async (id, title, description) => {
        try {
            const response = await fetch(`${host}/api/announcements/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });
            if (!response.ok) {
                throw new Error('Failed to edit announcement');
            }
            const updatedAnnouncement = await response.json();
            const newAnnouncements = announcements.map((announcement) =>
                announcement.id === id ? updatedAnnouncement : announcement
            );
            setAnnouncements(newAnnouncements); // Update the edited announcement in state
        } catch (error) {
            console.error("Error editing announcement:", error.message); // Improved error logging
        }
    };

    return (
        <AnnounceContext.Provider value={{ 
            announcements, 
            addAnnouncement, 
            deleteAnnouncement, 
            editAnnouncement, 
            fetchAnnouncements, 
            students, 
            fetchStudents 
        }}>
            {props.children}
        </AnnounceContext.Provider>
    );
};

export default AnnouncementState;
