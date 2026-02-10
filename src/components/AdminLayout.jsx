import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import '../styles/admin.css';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const adminToken = localStorage.getItem('adminToken');

    if (!adminToken) {
        return <Navigate to="/admin-login" replace />;
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={`admin-layout ${isSidebarOpen ? 'is-sidebar-open' : ''}`}>
            {/* Mobile Overlay */}
            {isSidebarOpen && <div className="admin-overlay" onClick={toggleSidebar} />}

            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="admin-main">
                <header className="admin-header">
                    <button className="admin-mobile-toggle" onClick={toggleSidebar}>
                        {isSidebarOpen ? '✕' : '☰'}
                    </button>

                    <div className="admin-header__search">
                        {/* Global Admin Search if needed */}
                    </div>

                    <div className="admin-header__profile">
                        <span className="admin-header__role">Administrator</span>
                        <div className="admin-header__avatar">A</div>
                    </div>
                </header>

                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
