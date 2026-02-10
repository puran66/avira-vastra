import { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';
import toast from 'react-hot-toast';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await ordersAPI.getAll();
            setOrders(data);
        } catch (err) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await ordersAPI.updateStatus(id, status);
            toast.success('Order status updated');
            fetchOrders();
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const filteredOrders = orders.filter(o =>
        filter === 'ALL' || o.orderStatus === filter
    );

    if (loading) return <div className="admin-loading">Processing Orders...</div>;

    const statusOptions = ['PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

    return (
        <div className="admin-orders">
            <h2 className="admin-title">Order Management</h2>

            <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div className="admin-tabs" style={{ display: 'flex', gap: '0.5rem' }}>
                        {['ALL', 'PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => (
                            <button
                                key={s}
                                className={`admin-btn ${filter === s ? 'admin-btn--primary' : 'admin-btn--outline'}`}
                                onClick={() => setFilter(s)}
                                style={{ fontSize: '0.75rem', padding: '0.4rem 1rem' }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                    <button className="admin-btn admin-btn--outline" onClick={fetchOrders}>🔄 Refresh</button>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Payment</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order._id}>
                                    <td style={{ fontWeight: '700' }}>#{order.orderId.split('-')[1]}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div style={{ fontWeight: '500' }}>{order.customerName}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#666' }}>{order.phone}</div>
                                    </td>
                                    <td>
                                        <span className={`status-badge status-badge--${order.paymentStatus === 'PAID' ? 'success' : 'warning'}`}>
                                            {order.paymentStatus}
                                        </span>
                                        <div style={{ fontSize: '0.7rem', marginTop: '0.2rem', color: '#888' }}>{order.paymentMethod}</div>
                                    </td>
                                    <td style={{ fontWeight: '600' }}>₹{order.totalAmount.toLocaleString('en-IN')}</td>
                                    <td>
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            style={{
                                                padding: '0.3rem',
                                                fontSize: '0.75rem',
                                                borderRadius: '4px',
                                                border: '1px solid #ddd'
                                            }}
                                        >
                                            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <button className="admin-btn admin-btn--outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
                                            Details
                                        </button>
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

export default AdminOrders;
