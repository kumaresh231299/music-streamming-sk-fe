import axios from "axios";
import React, { useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
    // const navigate = useNavigate();
    // const location = useLocation();

    // State to manage edit
    const [isEditing, setIsEditing] = useState(false);

    //Retrieve user details from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user:  ", user);

    //Formik initial values
    const initialValues = {
        firstName: user?.result?.firstName || "",
        lastName: user?.result?.lastName || "",
        email: user?.result?.email || ""
    }

    //Formik validation schema
    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required")
    })


    // Handle back navigation
    // const handleBack = () => {
    //     if (location.pathname !== "/") {
    //         navigate(-1);
    //     }
    // };

    // Toggle edit mode
    const handleEdit = (e) => {
        e.preventDefault();// Prevent form submission
        setIsEditing(!isEditing); // Toggle edit mode state
    };

    // Handle save action to update user details
    const handleSave = async (values) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/update/user-details/${user?.result?._id}`,
                values
            );
            // Response data updated to user localStorage
            localStorage.setItem("user", JSON.stringify(response.data));
            setIsEditing(false);
            toast.success("User details updated successfully!");
        } catch (error) {
            console.error("Failed to update user details:  ", error);
            toast.error("An error occurred while saving user details.");
        }
    };

    //handle cancel action
    const handleCancel = (resetForm) => {
        resetForm();    // Reset form to initial values
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div className="">
            {/* Back Button */}
            {/* <button
                onClick={handleBack}
                className="mb-1 btn btn-secondary rounded"
                aria-label="Go Back"
            >
                <GrPrevious />
            </button> */}

            {/* User Details Container */}
            <div className="max-w-lg w-100 p-4 mt-1 mb-4 bg-white rounded-lg shadow">
                <ToastContainer />
                <h2 className="h2 text-center text-dark mb-4">User Details</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {({ values, handleChange, resetForm }) => (
                        <Form>
                            {/* User Info */}
                            <div className="form-group mb-3">
                                <label className="form-label text-dark">First Name:</label>
                                {isEditing ? (
                                    <Field
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <p className="form-control bg-light">
                                        {user?.result?.firstName}
                                    </p>
                                )}
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-danger small"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label text-dark">Last Name:</label>
                                {isEditing ? (
                                    <Field
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <p className="form-control bg-light">
                                        {user?.result?.lastName}
                                    </p>
                                )}
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="text-danger small"
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label text-dark">Email:</label>
                                {isEditing ? (
                                    <Field
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <p className="form-control bg-light">
                                        {user?.result?.email}
                                    </p>
                                )}
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-danger small"
                                />
                            </div>

                            {/* Edit/Save and Cancel Buttons */}
                            <div className="d-flex justify-content-between">
                                {!isEditing ? (
                                    <button
                                        type="button"
                                        onClick={handleEdit}
                                        className="btn btn-warning w-100 font-weight-bold"
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="submit"
                                            className="btn btn-success font-weight-bold mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleCancel(resetForm)}
                                            className="btn btn-danger font-weight-bold"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    );
};

export default UserDetails;
