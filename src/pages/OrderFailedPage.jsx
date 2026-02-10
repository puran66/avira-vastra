/**
 * Order Failed Page
 * Shown when payment fails or order creation errors
 */

import { Link, useParams } from 'react-router-dom';

const OrderFailedPage = () => {
    const { orderId } = useParams();

    return (
        <div className="success-page">
            <div className="success-container">
                <div className="success-card" style={{ boxShadow: '0 10px 40px rgba(255, 0, 0, 0.05)' }}>
                    <div className="success-icon">❌</div>
                    <h1 className="success-title">Payment Failed</h1>
                    <p className="success-message">
                        We couldn't process your payment for Order **#{orderId}**. Please try again or choose a different payment method.
                    </p>

                    <div className="success-actions">
                        <Link to="/checkout" className="btn-secondary">Retry Checkout</Link>
                        <Link to="/cart" className="btn-primary">Return to Bag</Link>
                    </div>

                    <p className="support-text">
                        If money was deducted from your account, it will be refunded automatically within 5-7 business days.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderFailedPage;
