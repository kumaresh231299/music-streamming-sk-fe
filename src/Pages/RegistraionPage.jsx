import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegistraionPage = ({ setFrom }) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Formik for form handling and validation
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().min(8, "Password must be at least 8 characters")
                .matches(/[A-Z]/, "Password must contain an uppercase letter")
                .matches(/[a-z]/, "Password must contain a lowercase letter")
                .matches(/\d/, "Password must contain a number")
                .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            const payload = { firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password };
            try {
                const res = await axios.post("http://localhost:4000/api/user/register-user", payload);
                toast.success(res.data.message);
                setTimeout(() => {
                    setFrom("Login")
                }, 3000);
            } catch (error) {
                toast.error(error.response?.data?.message || "Registration failed");
            }
        }
    });

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card w-100" style={{ maxWidth: "28rem" }}>
                <div className="card-body">
                    <h2 className="card-title text-center">User Registration</h2>
                    <p className="text-center text-muted">Create your account to get started.</p>
                    <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
                        
                        {/* FirstName Input */}
                        <div className="mb-3">
                            <input
                                id="firstname"
                                name="firstName"
                                type="text"
                                placeholder="Firstname"
                                className={`form-control ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`}
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <div className="invalid-feedback">{formik.errors.firstName}</div>
                            )}
                        </div>

                        {/* LastName Input */}
                        <div className="mb-3">
                            <input
                                id="lastname"
                                name="lastName"
                                type="text"
                                placeholder="Lastname"
                                className={`form-control ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`}
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <div className="invalid-feedback">{formik.errors.lastName}</div>
                            )}
                        </div>

                        {/* Email Input */}
                        <div className="mb-3">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="mb-3 position-relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-100">
                            Register
                        </button>
                    </form>

                    {/* Navigate to Login Page */}
                    <div className="mt-4 text-center" style={{cursor :"pointer"}}>
                        <p>Already have an account? <span onClick={() => setFrom("Login")} className="text-primary" style={{ cursor: 'pointer' }}>Sign In</span></p>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default RegistraionPage;
