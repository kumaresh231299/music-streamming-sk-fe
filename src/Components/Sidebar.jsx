// import React, { useState } from "react";
// import { FaArrowRight, FaList, FaPlus } from "react-icons/fa";
// import { FiSearch } from "react-icons/fi";
// import { LiaHomeSolid } from "react-icons/lia";
// import { MdLibraryMusic } from "react-icons/md";
// import { PiMicrophoneStageDuotone } from "react-icons/pi";
// import { Button } from "react-bootstrap";
// import { MusicState } from "../Context/MusicContext";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//     const { setShowModal, isOpen, setIsOpen } = MusicState();
//     const navigate = useNavigate();
//     // Retrieve user from localStorage
//     const userDetails = JSON.parse(localStorage.getItem("user"));

//     return (
//         <div>
//             {/* Sidebar for large and medium screens */}
//             <div className="d-none d-md-flex bg-dark text-white p-2 sidebar-lg">
//                 <div className="py-3 rounded">
//                     <div className="d-flex flex-column" style={{cursor:"pointer"}}>
//                         <div 
//                         className="d-flex align-items-center gap-3 px-3 cursor-pointer bg-secondary" 
//                         onClick={() => navigate("/")}>
//                             <LiaHomeSolid size={20} />
//                             <p className="fw-bold mt-3">Home</p>
//                         </div>
//                     </div>

//                     <div className="bg-secondary text-white p-4 rounded mb-3 mt-4">
//                         <h5>Create your first Playlist</h5>
//                         {/* <p className="text-muted">It's easy, we'll help you</p> */}

//                         <div className="d-flex justify-content-between">
//                             <div className="px-1">
//                             <Button className="btn btn-light text-dark" onClick={() => setShowModal(true)}>
//                                 Create Playlist
//                             </Button>
//                             </div>
//                             <div className="px-1">
//                             <Button
//                                 className="btn btn-light text-dark"
//                                 onClick={() => {
//                                     localStorage.removeItem("user");
//                                     navigate("/")
//                                     window.location.reload();
//                                 }}
//                             >
//                                 Log Out
//                             </Button>
//                             </div>
                            
//                         </div>
//                     </div>

//                     {/* Music Icon */}
//                     <div className="d-flex justify-content-center mb-3 bg-secondary p-2">
//                         <MdLibraryMusic size={68} />
//                     </div>
//                      {/*  App Name */}
//                     <div className="bg-secondary p-3 d-flex justify-content-between align-items-center rounded">
//                         <p className="fs-5">SK Music Streaming</p>
//                         <PiMicrophoneStageDuotone size={40} />
//                     </div>
//                 </div>
//             </div>

//             {/* Toggle Button for Small Screens */}
//             {isOpen && (
//                 <div className="d-lg-none bg-dark text-white p-2 small-screen-sidebar">
//                     <div className="d-flex flex-column gap-3">
//                         <div className="d-flex align-items-center gap-3 px-3 cursor-pointer" onClick={() => navigate("/")}>
//                             <LiaHomeSolid size={20} />
//                             <p className="fw-bold mt-3">Home</p>
//                         </div>
//                         <div className="d-flex align-items-center gap-3 px-3 cursor-pointer">
//                             <Button className="btn btn-light text-dark" onClick={() => setShowModal(true)}>
//                                 Create Playlist
//                             </Button>
//                         </div>
//                         <div className="d-flex align-items-center gap-3 px-3 cursor-pointer" onClick={() => {
//                             localStorage.removeItem("user");
//                             window.location.reload();
//                         }}>
//                             <Button
//                                 className="btn btn-light text-dark"
//                                 onClick={() => {
//                                     localStorage.removeItem("user");
//                                     navigate("/")
//                                     window.location.reload();
//                                 }}
//                             >
//                                 Log Out
//                             </Button>
//                         </div>

//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Sidebar;


// import React, { useState } from "react";
// import { FaPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
// import { FiSearch } from "react-icons/fi";
// import { LiaHomeSolid } from "react-icons/lia";
// import { MdLibraryMusic } from "react-icons/md";
// import { PiMicrophoneStageDuotone } from "react-icons/pi";
// import { Button } from "react-bootstrap";
// import { MusicState } from "../Context/MusicContext";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const { setShowModal, isOpen, setIsOpen } = MusicState();
//   const navigate = useNavigate();
//   const userDetails = JSON.parse(localStorage.getItem("user"));

//   // Handle toggling sidebar
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       {/* Sidebar for large and medium screens */}
//       <div className="d-none d-md-flex flex-column bg-dark text-white p-4 sidebar-lg">
//         <div className="py-3 rounded">
          

//           {/* Navigation Links */}
//           <div className="d-flex flex-column gap-4">
//             <div
//               className="d-flex align-items-center gap-3 px-3 sidebar-link"
//               style={{ cursor: "pointer" }}
//               onClick={() => navigate("/")}
//             >
//               <LiaHomeSolid size={22} />
//               <p className="m-0">Home</p>
//             </div>
//             <div
//               className="d-flex align-items-center gap-3 px-3 sidebar-link"
//               onClick={() => setShowModal(true)}
//             >
//               <FaPlus size={22} />
//               <p className="m-0">Create Playlist</p>
//             </div>
//           </div>

//           {/* Divider */}
//           <hr className="my-4 text-secondary" />

//           {/* Playlist Section */}
//           <div className="bg-secondary text-white p-3 rounded">
//             <h5>Create your first Playlist</h5>
//             <div className="d-flex gap-2 mt-3">
//               <Button variant="light" onClick={() => setShowModal(true)}>
//                 New Playlist
//               </Button>
//               <Button
//                 variant="danger"
//                 onClick={() => {
//                   localStorage.removeItem("user");
//                   navigate("/");
//                   window.location.reload();
//                 }}
//               >
//                 Log Out
//               </Button>
//             </div>
//           </div>
//         </div>
//         {/* Logo and App Name */}
//         <div className="d-flex justify-content-center align-items-center mt-3">
//             <MdLibraryMusic size={50} className="me-2" />
//             <h3 className="fw-bold">SK Music</h3>
//           </div>
//       </div>

//       {/* Toggle Button for Small Screens */}
//       <div className="d-md-none">
//         <Button
//           variant="dark"
//           onClick={toggleSidebar}
//           className="p-2 position-fixed top-0 start-0"
//           style={{ zIndex: 1000 }}
//         >
//           <FaBars size={24} />
//         </Button>
//       </div>

//       {/* Collapsible Sidebar for Small Screens */}
//       {isOpen && (
//         <div className="d-lg-none bg-dark text-white p-3 small-screen-sidebar">
//           <div className="d-flex flex-column gap-4">
//             <div
//               className="d-flex align-items-center gap-3 px-3"
//               onClick={() => navigate("/")}
//               style={{ cursor: "pointer" }}
//             >
//               <LiaHomeSolid size={20} />
//               <p className="m-0">Home</p>
//             </div>
//             <div
//               className="d-flex align-items-center gap-3 px-3"
//               onClick={() => setShowModal(true)}
//               style={{ cursor: "pointer" }}
//             >
//               <FaPlus size={20} />
//               <p className="m-0">Create Playlist</p>
//             </div>
//             <div
//               className="d-flex align-items-center gap-3 px-3"
//               style={{ cursor: "pointer" }}
//               onClick={() => {
//                 localStorage.removeItem("user");
//                 navigate("/");
//                 window.location.reload();
//               }}
//             >
//               <FaSignOutAlt size={20} />
//               <p className="m-0">Log Out</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { FaPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import { LiaHomeSolid } from "react-icons/lia";
import { MdLibraryMusic } from "react-icons/md";
import { Button } from "react-bootstrap";
import { MusicState } from "../Context/MusicContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { setShowModal, isOpen, setIsOpen } = MusicState();
  const navigate = useNavigate();

  // Handle toggling sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar for large and medium screens */}
      <div className="d-none d-md-flex flex-column bg-dark text-white p-4 sidebar-lg">
        <div className="py-3 rounded">
          {/* Navigation Links */}
          <div className="d-flex flex-column gap-4">
            <div
              className="d-flex align-items-center gap-3 px-3 sidebar-link"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <LiaHomeSolid size={22} />
              <p className="m-0">Home</p>
            </div>
            <div
              className="d-flex align-items-center gap-3 px-3 sidebar-link"
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
            >
              <FaPlus size={22} />
              <p className="m-0">Create Playlist</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-4 text-secondary" />

          {/* Logo, App Name, and Logout Button */}
          <div className="d-flex flex-row" style={{whiteSpace: "nowrap"}}>
          <MdLibraryMusic size={50} className="me-2" />
          <h3 className="fw-bold mt-1">SK Music</h3>
          </div>
          <div className="d-flex flex-column ">
            {/* <MdLibraryMusic size={50} className="me-2" />
            <h3 className="fw-bold">SK Music</h3> */}
            <Button
              variant="danger"
              className="mt-4"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
                window.location.reload();
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Collapsible Sidebar for Small Screens */}
      {isOpen && (
        <div className="d-lg-none bg-dark text-white p-3 small-screen-sidebar bg-black">
          <div className="d-flex flex-column gap-4">
            <div
              className="d-flex align-items-center gap-3 px-3"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <LiaHomeSolid size={20} />
              <p className="m-0">Home</p>
            </div>
            <div
              className="d-flex align-items-center gap-3 px-3"
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
            >
              <FaPlus size={20} />
              <p className="m-0">Create Playlist</p>
            </div>
            <div
              className="d-flex align-items-center gap-3 px-3"
              style={{ cursor: "pointer" }}
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
                window.location.reload();
              }}
            >
              <FaSignOutAlt size={20} />
              <p className="m-0">Log Out</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
