/**
 * Order Success Page
 * Confirmation after successful order/payment
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import '../styles/order-success.css';

const OrderSuccessPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId || !user?.email) return;

            try {
                setLoading(true);
                const data = await ordersAPI.track({
                    orderId,
                    email: user.email
                });
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order details', error);
                // Don't show toast if we are just waiting for data
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated && user?.email) {
            fetchOrder();
        } else if (isAuthenticated === false) {
            setLoading(false);
        }
    }, [orderId, user?.email, isAuthenticated]);

    if (loading) {
        return (
            <div className="success-page">
                <div className="success-container" style={{ textAlign: 'center' }}>
                    <div className="loading-spinner" style={{ margin: '0 auto 1.5rem' }}></div>
                    <p>Fetching your order details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="success-page">
            <div className="success-container">
                <div className="success-card">
                    <div className="success-icon">✨</div>
                    <h1 className="success-title">Order Confirmed!</h1>
                    <p className="success-message">
                        Thank you for choosing **Avira Vastra**. Your order has been placed successfully and is being processed.
                    </p>

                    <div className="order-info">
                        <div className="info-row">
                            <span>Order ID:</span>
                            <strong>{orderId}</strong>
                        </div>
                        <div className="info-row">
                            <span>Date:</span>
                            <span>{new Date(order?.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="info-row">
                            <span>Total Amount:</span>
                            <strong>₹{order?.totalAmount?.toLocaleString() || '...'}</strong>
                        </div>
                        <div className="info-row">
                            <span>Payment Status:</span>
                            <span className={`status-badge ${order?.paymentStatus?.toLowerCase() || 'paid'}`}>
                                {order?.paymentStatus || 'PAID'}
                            </span>
                        </div>
                    </div>

                    <div className="success-actions">
                        <Link to="/profile" className="btn-secondary">View My Orders</Link>
                        <Link to="/products" className="btn-primary">Continue Shopping</Link>
                    </div>

                    <p className="support-text">
                        A confirmation email has been sent to your registered email address. For any queries, please reach out to our WhatsApp support.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
