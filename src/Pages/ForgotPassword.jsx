import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = ({ setFrom }) => {
    // const navigate = useNavigate();

    // Formik
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Invalid email address").required("Email is required"),
        }),
        onSubmit: async (values) => {
            const payload = { email: values.email };
            try {
                const res = await axios.post("https://music-streamming-sk-app-be.onrender.com/api/user/forgot-password", payload);
                toast.success(res.data.message || "Reset link sent successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    navigate("Login");
                }, 3000);
            } catch (error) {
                toast.error(error.response?.data?.message || "Forgot Password failed", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-3">Forgot Password</h2>
                <p className="text-center text-muted mb-4">Enter your email to reset your password.</p>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Send Reset Link
                    </button>
                </form>

                {/* Navigation Links */}
                <div className="mt-4 text-center">
                    <p className="text-muted">
                        Don't have an account? <span className="text-primary" role="button" onClick={() => setFrom("Register")}>Sign Up</span>
                    </p>
                    <p className="text-muted">
                        Remember your password? <span className="text-primary" role="button" onClick={() => setFrom("Login")}>Sign In</span>
                    </p>
                </div>
            </div>

            {/* Toast Notification */}
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
