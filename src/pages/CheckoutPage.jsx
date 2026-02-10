/**
 * Checkout Page
 * Multi-step checkout with Address and Payment
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import { ordersAPI, paymentAPI, authAPI } from '../services/api';
import FullPageLoader from '../components/FullPageLoader';
import toast from 'react-hot-toast';
import '../styles/checkout.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { items, getTotal, clearCart } = useCartStore();
    const { user, isAuthenticated, updateUser } = useAuthStore();

    const [step, setStep] = useState(1); // 1: Address, 2: Payment
    const [loading, setLoading] = useState(false);

    const [addressData, setAddressData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        pincode: user?.address?.pincode || '',
    });

    // Check auth and cart
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error('Please login to checkout', { id: 'login-to-checkout' });
            navigate('/login?redirect=checkout');
            return;
        }
        if (items.length === 0) {
            navigate('/cart');
        }
    }, [isAuthenticated, items, navigate]);

    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = () => {
        // Validation
        if (!addressData.street || !addressData.city || !addressData.pincode || !addressData.phone) {
            toast.error('Please fill all required fields');
            return;
        }
        setStep(2);
        window.scrollTo(0, 0);
    };

    // Update profile if address changed
    const syncAddressWithProfile = async () => {
        const profilePayload = {
            name: addressData.name,
            phone: addressData.phone,
            address: {
                street: addressData.street,
                city: addressData.city,
                state: addressData.state,
                pincode: addressData.pincode
            }
        };

        try {
            const updatedUser = await authAPI.updateCustomerProfile(profilePayload);
            updateUser(updatedUser);
        } catch (error) {
            console.error('Failed to sync address with profile:', error);
        }
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            // 1. Sync address with profile first
            await syncAddressWithProfile();

            // 2. Create Order in Backend
            const orderPayload = {
                items: items.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.discountedPrice || item.price
                })),
                shippingAddress: {
                    address: addressData.street,
                    city: addressData.city,
                    state: addressData.state,
                    pincode: addressData.pincode
                },
                paymentMethod: 'ONLINE',
                totalAmount: getTotal(),
                phone: addressData.phone,
                customerName: addressData.name,
                email: addressData.email
            };

            const order = await ordersAPI.create(orderPayload);

            // Handle Online Payment (Razorpay)
            handleRazorpayPayment(order);
        } catch (error) {
            toast.error(error.message || 'Failed to place order');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRazorpayPayment = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere',
            amount: order.totalAmount * 100,
            currency: "INR",
            name: "Avira Vastra",
            description: `Order #${order.orderId}`,
            image: "/logo.png",
            order_id: order.razorpayOrderId,
            handler: async (response) => {
                try {
                    setLoading(true);
                    const verifyData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    };

                    const verification = await paymentAPI.verify(verifyData);
                    if (verification.success) {
                        toast.success('Payment successful!');
                        clearCart();

                        // Safety check: ensure orderId exists before navigation
                        const successId = order.orderId || order._id;
                        if (successId) {
                            setTimeout(() => {
                                navigate(`/order-success/${successId}`);
                            }, 500);
                        } else {
                            toast.error('Payment verified, but could not find Order ID');
                            navigate('/profile');
                        }
                    }
                } catch (error) {
                    toast.error('Payment verification failed');
                    navigate(`/order-failed/${order.orderId}`);
                } finally {
                    setLoading(false);
                }
            },
            prefill: {
                name: addressData.name,
                email: addressData.email,
                contact: addressData.phone
            },
            notes: {
                address: addressData.street
            },
            theme: {
                color: "#1a1a1a"
            },
            modal: {
                ondismiss: () => {
                    toast.error('Payment cancelled');
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const subtotal = getTotal();
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className="checkout-page">
            {loading && <FullPageLoader message="Finalizing your order..." />}
            <div className="checkout-container">
                {/* Steps */}
                <div className="checkout-steps">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>
                        <div className="step-number">1</div>
                        <span>Address</span>
                    </div>
                    <div className="step-divider"></div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>
                        <div className="step-number">2</div>
                        <span>Payment</span>
                    </div>
                </div>

                <div className="checkout-layout">
                    {/* Main Content */}
                    <div className="checkout-main">
                        {step === 1 ? (
                            <section className="checkout-card">
                                <h2 className="checkout-card__title">Shipping Information</h2>
                                <form className="checkout-form">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            value={addressData.name}
                                            onChange={handleInputChange}
                                            placeholder="Recipient's Name"
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                value={addressData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input name="email" type="email" value={addressData.email} disabled />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Street / Area / House No.</label>
                                        <input
                                            name="street"
                                            type="text"
                                            value={addressData.street}
                                            onChange={handleInputChange}
                                            placeholder="Apartment, suite, unit, etc."
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input
                                                name="city"
                                                type="text"
                                                value={addressData.city}
                                                onChange={handleInputChange}
                                                placeholder="City"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Pincode</label>
                                            <input
                                                name="pincode"
                                                type="text"
                                                value={addressData.pincode}
                                                onChange={handleInputChange}
                                                placeholder="6-digit ZIP"
                                                maxLength="6"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>State</label>
                                        <input
                                            name="state"
                                            type="text"
                                            value={addressData.state}
                                            onChange={handleInputChange}
                                            placeholder="State"
                                        />
                                    </div>
                                    <button type="button" onClick={handleNextStep} className="checkout-btn">
                                        Continue to Payment
                                    </button>
                                </form>
                            </section>
                        ) : (
                            <section className="checkout-card">
                                <button className="back-btn" onClick={() => setStep(1)}>
                                    ← Back to Address
                                </button>
                                <h2 className="checkout-card__title">Payment Method</h2>
                                <div className="payment-options">
                                    <div
                                        className="payment-option active"
                                        style={{ cursor: 'default' }}
                                    >
                                        <div className="payment-option__text">
                                            <h4>Online Payment (Razorpay)</h4>
                                            <p>Fast and Secure: UPI, Debit/Credit Cards, and Net Banking</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="razorpay-badge">
                                    🛡️ 100% Secure SSL Encrypted Payment
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    className="checkout-btn"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing Transaction...' : `Pay ₹${total.toLocaleString()} Securely`}
                                </button>
                            </section>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <aside className="checkout-summary">
                        <div className="checkout-card">
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Order Summary</h3>
                            <div className="summary-items">
                                {items.map(item => (
                                    <div key={item._id} className="summary-item">
                                        <img src={item.images?.[0]} alt={item.name} className="summary-item__image" />
                                        <div className="summary-item__info">
                                            <h4 className="summary-item__name">{item.name}</h4>
                                            <p className="summary-item__price">Qnty: {item.quantity} × ₹{(item.discountedPrice || item.price).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-content">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span>Shipping</span>
                                    <span style={{ color: '#059669', fontWeight: 'bold' }}>FREE</span>
                                </div>
                                <div style={{ height: '1px', background: '#eee', margin: '1rem 0' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.15rem' }}>
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
