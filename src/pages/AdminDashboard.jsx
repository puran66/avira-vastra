import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminAPI.getStats();
                setStats(data.stats);
                setRecentOrders(data.recentOrders);
            } catch (err) {
                setError('Failed to fetch dashboard statistics');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="admin-loading">Loading Dashboard...</div>;
    if (error) return <div className="admin-error">{error}</div>;

    return (
        <div className="admin-dashboard">
            <h2 className="admin-title">Business Overview</h2>

            <div className="admin-stats-grid">
                <div className="stat-card">
                    <span className="stat-card__label">Total Revenue</span>
                    <span className="stat-card__value">₹{stats?.revenue?.toLocaleString('en-IN')}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-card__label">Total Orders</span>
                    <span className="stat-card__value">{stats?.totalOrders}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-card__label">Pending Orders</span>
                    <span className="stat-card__value" style={{ color: 'var(--admin-warning)' }}>
                        {stats?.pendingOrders}
                    </span>
                </div>
                <div className="stat-card">
                    <span className="stat-card__label">Total Products</span>
                    <span className="stat-card__value">{stats?.totalProducts}</span>
                </div>
            </div>

            <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0 }}>Recent Orders</h3>
                    <Link to="/admin/orders" className="admin-btn admin-btn--outline">View All</Link>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td style={{ fontWeight: '600' }}>#{order.orderId.split('-')[1]}</td>
                                    <td>{order.customerName}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>₹{order.totalAmount.toLocaleString('en-IN')}</td>
                                    <td>
                                        <span className={`status-badge status-badge--${order.orderStatus === 'PLACED' ? 'info' :
                                                order.orderStatus === 'DELIVERED' ? 'success' :
                                                    order.orderStatus === 'CANCELLED' ? 'danger' : 'warning'
                                            }`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/admin/orders/${order._id}`} className="admin-btn admin-btn--outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
