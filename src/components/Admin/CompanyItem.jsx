// CompanyItem.jsx

const CompanyItem = (props) => {
     const { company, delCompany } = props;
 
     const handleDeleteClick = () => {
         console.log("Company object in CompanyItem:", company); // Log to confirm structure
         delCompany(company); // Pass the full company object to delCompany
     };
 
     return (
         <div className="w-50 m-1">
             <div className="card w-100 mb-3">
                 <div className="d-flex justify-align-align-content-xl-between">
                     <div className="card-body d-flex">
                         <div className="my-1 mx-4">
                             <svg xmlns="http://www.w3.org/2000/svg" height="52" width="52" viewBox="0 0 512 512">
                                 <path d="..." />
                             </svg>
                         </div>
                         <div>
                             <h5 className="card-title">{company.companyName}</h5>
                             <p className="card-text">Offering: {company.type}</p>
                             <p className="card-text">Forms open till: {company.closingDate.slice(0, 10)}</p>
                         </div>
                     </div>
                     <div className="card-body">
                         <h5 className="card-title">Batch: {company.batch}</h5>
                         <p className="card-text">Required GPA: {company.requiredGPA}</p>
                         <i className="fa-solid fa-trash mx-2 cursor-pointer" onClick={handleDeleteClick}></i>
                     </div>
                 </div>
             </div>
         </div>
     );
 };
 
 export default CompanyItem;
 