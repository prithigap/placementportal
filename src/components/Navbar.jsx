import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  // Check and set the user role from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Parse the user object
        setUserRole(parsedUser.role); // Set the user role from parsed user object
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('😱 Logged out successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setUserRole(null); // Clear the user role
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Placement Portal</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>

              {/* Conditionally render links based on user role */}
              {userRole === 'student' && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/student/companies" ? "active" : ""}`} aria-current="page" to="/student/companies">Job Listings</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/student/announcements" ? "active" : ""}`} aria-current="page" to="/student/announcements">Announcements</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/student/applications" ? "active" : ""}`} aria-current="page" to="/student/applications">Applications</Link>
                  </li>
                </>
              )}
              {userRole === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/admin/companies" ? "active" : ""}`} aria-current="page" to="/admin/companies">Companies</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/admin/students" ? "active" : ""}`} aria-current="page" to="/admin/students">Students</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/admin/announcements" ? "active" : ""}`} aria-current="page" to="/admin/announcements">Announcements</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/admin/applications" ? "active" : ""}`} aria-current="page" to="/admin/applications">Applications</Link>
                  </li>
                </>
              )}
              <li className="nav-item dropdown">
                <a className={`nav-link dropdown-toggle ${location.pathname === "/about" || location.pathname === "/contact-us" ? "active" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Reach out to us
                </a>
                <ul className="dropdown-menu">
                  <li><Link className={`dropdown-item ${location.pathname === "/about" ? "active" : ""}`} to="/about">About Us</Link></li>
                  <li><Link className={`dropdown-item ${location.pathname === "/contact-us" ? "active" : ""}`} to="/contact-us">Contact Us</Link></li>
                </ul>
              </li>
            </ul>

            {!userRole ? (
              <div className="d-flex" role="search">
                <Link type="button" className="btn btn-primary mx-2" to="/login">Login</Link>
              </div>
            ) : (
              <>
                <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>
                <Link to="/profile" className=""><img src="avatar.gif" className="avatar" alt="profile" /></Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
