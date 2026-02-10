import { Link, useLocation } from 'react-router-dom';
import '../styles/admin-sidebar.css';

const AdminSidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/admin/orders', icon: '📦', label: 'Orders' },
        { path: '/admin/products', icon: '🛍️', label: 'Products' },
        { path: '/admin/taxonomy', icon: '🏷️', label: 'Store Taxonomy' },
        { path: '/admin/users', icon: '👥', label: 'Customers' },
        { path: '/admin/content', icon: '🎨', label: 'Website Content' },
    ];

    return (
        <aside className={`admin-sidebar ${isOpen ? 'admin-sidebar--open' : ''}`}>
            <div className="admin-sidebar__header">
                <h1 className="admin-sidebar__logo">Avira Admin</h1>
                <button className="admin-sidebar__close" onClick={onClose}>✕</button>
            </div>

            <nav className="admin-sidebar__nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={`admin-sidebar__nav-link ${location.pathname === item.path ? 'admin-sidebar__nav-link--active' : ''}`}
                    >
                        <span className="admin-sidebar__nav-icon">{item.icon}</span>
                        <span className="admin-sidebar__nav-label">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="admin-sidebar__footer">
                <Link to="/" className="admin-sidebar__nav-link" onClick={onClose}>
                    <span className="admin-sidebar__nav-icon">🏠</span>
                    <span className="admin-sidebar__nav-label">Back to Store</span>
                </Link>
                <button
                    onClick={() => {
                        localStorage.removeItem('adminToken');
                        localStorage.removeItem('adminData');
                        window.location.href = '/admin-login';
                    }}
                    className="admin-sidebar__nav-link admin-sidebar__logout"
                >
                    <span className="admin-sidebar__nav-icon">🚪</span>
                    <span className="admin-sidebar__nav-label">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
