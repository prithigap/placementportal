import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AnnouncementItem from "./AnnouncementItem";
import AnnounceContext from "../../context/announcements/AnnounceContext";
import { toast } from 'react-toastify';

const Announcements = () => {
  const navigate = useNavigate();
  const context = useContext(AnnounceContext);
  const { announcements, fetchAnnouncements, editAnnouncement, addAnnouncement, deleteAnnouncement } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchAnnouncements();
    } else {
      navigate('/login');
    }
  }, []);

  const [announcement, setAnnouncement] = useState({ id: "", title: "", description: "" });
  const [addAnnouncementData, setAddAnnouncementData] = useState({ title: "", description: "" });
  const [current, setCurrent] = useState({ id: "" });

  const refEditModal = useRef(null);
  const refAddModal = useRef(null);
  const refDeleteModal = useRef(null);
  const refCloseEdit = useRef(null);
  const refCloseAdd = useRef(null);
  const refCloseDelete = useRef(null);

  const updateAnnouncement = (currentAnnouncement) => {
    refEditModal.current.click();
    setAnnouncement({ id: currentAnnouncement.id, title: currentAnnouncement.title, description: currentAnnouncement.description });
  };

  const delAnnouncement = (currentAnnouncement) => {
    // Debug log for the whole object
    console.log("Current announcement object:", currentAnnouncement);

    // Check for both `id` and `_id` properties
    const announcementId = currentAnnouncement.id || currentAnnouncement._id;

    console.log("Attempting to delete announcement with ID:", announcementId); // Confirm ID

    if (announcementId) {
        setCurrent({ id: announcementId });
        refDeleteModal.current.click();
    } else {
        console.error("Announcement ID is undefined in delAnnouncement");
    }
};


  const handleDelete = () => {
    console.log("Attempting to delete announcement with ID:", current.id); // Debug log
    deleteAnnouncement(current.id);
    refCloseDelete.current.click();
    toast.success('🗑️ Announcement Deleted!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const addAnnouncementHandler = () => {
    refAddModal.current.click();
    setAddAnnouncementData({ title: '', description: '' });
  };

  const handleEditChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  const handleAddChange = (e) => {
    setAddAnnouncementData({ ...addAnnouncementData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editAnnouncement(announcement.id, announcement.title, announcement.description);
    toast.success('🌸 Announcement Updated!');
    refCloseEdit.current.click();
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addAnnouncement(addAnnouncementData.title, addAnnouncementData.description);
    toast.success('🌟 Announcement Added!');
    refCloseAdd.current.click();
  };

  return (
    <div className="py-2">
      {/* Trigger Modals */}
      <button type="button" ref={refEditModal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">Launch Edit Modal</button>
      <button type="button" ref={refAddModal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#addModal">Launch Add Modal</button>
      <button type="button" ref={refDeleteModal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal">Launch Delete Modal</button>

      {/* Edit Modal */}
      <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">Edit Announcement</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refCloseEdit}></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" name="title" placeholder="Title" value={announcement.title} onChange={handleEditChange} />
              <input type="text" className="form-control mt-2" name="description" placeholder="Description" value={announcement.description} onChange={handleEditChange} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>Update Announcement</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <div className="modal fade" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">Add Announcement</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refCloseAdd}></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" name="title" placeholder="Title" value={addAnnouncementData.title} onChange={handleAddChange} />
              <input type="text" className="form-control mt-2" name="description" placeholder="Description" value={addAnnouncementData.description} onChange={handleAddChange} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleAddSubmit}>Add Announcement</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">Delete Announcement</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refCloseDelete}></button>
            </div>
            <div className="modal-body">Are you sure you want to delete this announcement?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Header with Title and Add Icon */}
      <div className="d-flex justify-content-center align-items-center gap-3">
        <h2 className="my-4">All Announcements</h2> 
        <i className="fa-solid fa-circle-plus fa-2xl cursor-pointer" onClick={addAnnouncementHandler}></i>
      </div>

      {/* Announcements List */}
      <div className="row g-1 overflow-auto m-2 d-flex justify-content-center" style={{ maxHeight: '70vh', minHeight: '60vh' }}>
        {announcements.length === 0 ? (
          <h6 className="py-2 container">No announcements to display!</h6>
        ) : (
          announcements.map((announcement) => (
            <AnnouncementItem key={announcement.id} announcement={announcement} updateAnnouncement={updateAnnouncement} delAnnouncement={delAnnouncement} />
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
