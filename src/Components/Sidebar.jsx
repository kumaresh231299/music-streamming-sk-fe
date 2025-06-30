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
        <div className="py-3 rounded" style={{borderRight:"2px solid white",paddingRight:"5px"}}>
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
