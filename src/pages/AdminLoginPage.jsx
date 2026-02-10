/**
 * Admin Login Page
 * Login page for admin panel access
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/admin-login.css';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authAPI.adminLogin(formData);

            if (response.token) {
                // Store token
                localStorage.setItem('adminToken', response.token);
                localStorage.setItem('adminData', JSON.stringify(response.admin));

                // Redirect to admin dashboard
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <div className="admin-login__container">
                <div className="admin-login__card">
                    <h1 className="admin-login__title">Admin Login</h1>
                    <p className="admin-login__subtitle">Access your admin panel</p>

                    {error && (
                        <div className="admin-login__error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="admin-login__form">
                        <div className="admin-login__field">
                            <label htmlFor="email" className="admin-login__label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="admin-login__input"
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="admin-login__field">
                            <label htmlFor="password" className="admin-login__label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="admin-login__input"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="admin-login__button"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <a href="/" className="admin-login__back">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
