import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = ({ setFrom, setUser }) => {
    // State variable for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState();

    // const navigate = useNavigate();

    // Toast function
    const showToastMessage = (msg, type) => {
        if (type === "success") {
            toast.success(msg);
        } else {
            toast.error(msg);
        }
    };

    // Formik
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            const payload = { email: values.email, password: values.password };
            try {
                const res = await axios.post("http://localhost:4000/api/user/login-user", payload);
                showToastMessage(res.data.message, "success");
                const userInfo = res.data; 
                localStorage.setItem("user", JSON.stringify(userInfo));
                setUser(res);
                localStorage.setItem('userId', res?.data?.result?._id);
                setUserId(res?.result?._id);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } catch (error) {
                showToastMessage(error.response?.data?.message || "Login failed", "error");
            }
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className="card p-4 shadow-sm">
                    <h2 className="text-center">User Login</h2>
                    <p className="text-center text-muted mb-4">Access your account</p>

                    <form onSubmit={formik.handleSubmit}>
                        {/* Email Input */}
                        <div className="form-group mb-3">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                                placeholder="Email address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="form-group mb-3 position-relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            
                            {formik.touched.password && formik.errors.password && (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            )}
                        </div>

                        <div className="d-flex justify-content-end mb-3" style={{cursor :"pointer"}}>
                            <span className="text-primary cursor-pointer" onClick={() => setFrom("Forgot")}>
                                Forgot Password?
                            </span>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>

                    <div className="text-center mt-4" style={{cursor :"pointer"}}>
                        <p>
                            Don't have an account?{" "}
                            <span className="text-primary cursor-pointer" onClick={() => setFrom("Register")}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default LoginPage;
