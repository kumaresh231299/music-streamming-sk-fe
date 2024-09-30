import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    // const navigate = useNavigate();
    const { id, token } = useParams(); // Get id and token from the URL

    // Formik setup
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            newPassword: Yup.string()
                .required('New Password is required')
                .min(8, 'Password must be at least 8 characters')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                ),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
        }),
        onSubmit: async (values) => {
            const payload = { newPassword: values.newPassword };
            try {
                const res = await axios.put(`http://localhost:4000/api/user/reset-password/${id}/${token}`, payload);
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Reset Password failed');
            }
        },
    });

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Reset Password</h2>
                <p className="text-center text-muted mb-4">Create a new password for your account.</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            className={`form-control ${formik.touched.newPassword && formik.errors.newPassword ? 'is-invalid' : ''}`}
                            placeholder="New Password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <div className="invalid-feedback">{formik.errors.newPassword}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                            placeholder="Confirm Password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Reset Password
                    </button>
                </form>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick />
        </div>
    );
};

export default ResetPassword;
