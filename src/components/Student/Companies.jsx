import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CompanyItem from "./CompanyItem";
import JobAppContext from "../../context/applications/JobAppContext";
import { toast } from "react-toastify";

const Companies = () => {
  const navigate = useNavigate();
  const context = useContext(JobAppContext);
  const { companies, fetchCompanies, submitApp, student, fetchStudent } = context;

  const [filterComp, setFilterComp] = useState([]); // Holds filtered companies
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const initializeData = async () => {
      if (localStorage.getItem("token")) {
        try {
          // Wait until both companies and student are fetched
          await fetchCompanies();
          await fetchStudent();
          setLoading(false); // Data is fetched, stop loading
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again later.");
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (!loading && companies.length && student) {
      console.log("Companies:", companies);
      console.log("Student:", student);

      if (!student.cgpa) {
        console.error("Invalid student GPA");
        return;
      }

      const filtered = companies.filter((company) => {
        // Only filter based on GPA and closing date
        const gpaComparison = parseFloat(company.requiredGPA) <= parseFloat(student.cgpa);

        console.log(
          `Company: ${company.companyName}, requiredGPA: ${company.requiredGPA}`,
          `GPA Comparison: ${gpaComparison}`
        );

        return gpaComparison && new Date(company.closingDate) >= Date.now();
      });

      setFilterComp(filtered); // Set filtered companies
      console.log("Filtered Companies:", filtered);
    }
  }, [companies, student, loading]);

  const [current, setCurrent] = useState({ did: "" });
  const refadd = useRef(null);
  const openRef = useRef(null);

  const addApp = (currentComp) => {
    if (!currentComp.id) {
      console.error("Invalid company data. Could not set application. Company object: ", currentComp);
      return;
    }
    setCurrent({ did: currentComp.id }); // Adjust to use 'id' not '_id'
    openRef.current.click();
  };

  const handleApp = async () => {
    try {
      if (current.did) {
        await submitApp(current.did);
        refadd.current.click();
        toast.success("Applied Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/student/applications");
      } else {
        toast.error("Invalid application data");
      }
    } catch (error) {
      console.error("Error submitting application: ", error);
      toast.error("Error submitting application");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div className="py-2">
      <div
        className="modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel2">
                Do you really want to apply? This change cannot be reverted.
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal" ref={refadd}>
                No
              </button>
              <button type="button" className="btn btn-primary mx-2" onClick={handleApp}>
                Yes, Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      <button type="button" ref={openRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
        Launch static backdrop modal
      </button>

      <div className="gap-3">
        <h2 className="d-flex justify-content-center my-4">Eligible Companies</h2>
        {filterComp.length === 0 ? (
          <h6 className="py-2 container">No companies hiring right now! Visit again after some time.</h6>
        ) : (
          <div className="row g-1 d-flex justify-content-center overflow-auto m-2" style={{ maxHeight: "70vh", minHeight: "60vh" }}>
            {filterComp.map((company) => {
              return <CompanyItem key={company.id} company={company} addApp={addApp} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
