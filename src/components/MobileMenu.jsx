/**
 * MobileMenu Component
 * Premium Traditional Saree Brand - Mobile Drawer
 * Calm, respectful, traditional navigation
 */

import '../styles/mobile-menu.css';

const MobileMenu = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className={`menu-backdrop ${isOpen ? 'menu-backdrop--visible' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <nav
                className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
                aria-label="Main navigation"
                aria-hidden={!isOpen}
            >
                {/* Close Button */}
                <button
                    className="mobile-menu__close"
                    onClick={onClose}
                    aria-label="Close menu"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Menu Content */}
                <div className="mobile-menu__content">

                    {/* Main Link */}
                    <a href="/" className="mobile-menu__link" onClick={onClose}>
                        Home
                    </a>

                    {/* Section: Shop by Occasion */}
                    <div className="mobile-menu__section">
                        <h3 className="mobile-menu__section-title">Shop by Occasion</h3>
                        <ul className="mobile-menu__list">
                            <li>
                                <a href="/wedding-sarees" className="mobile-menu__item" onClick={onClose}>
                                    Wedding Sarees
                                </a>
                            </li>
                            <li>
                                <a href="/festival-puja-sarees" className="mobile-menu__item" onClick={onClose}>
                                    Festival & Puja Sarees
                                </a>
                            </li>
                            <li>
                                <a href="/family-functions" className="mobile-menu__item" onClick={onClose}>
                                    Family Functions
                                </a>
                            </li>
                            <li>
                                <a href="/auspicious-gifting" className="mobile-menu__item" onClick={onClose}>
                                    Auspicious Gifting
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Primary Action: New Arrivals */}
                    <a href="/new-arrivals" className="mobile-menu__primary-link" onClick={onClose}>
                        New Arrivals
                        <span className="mobile-menu__arrow">→</span>
                    </a>

                    {/* Trust Line */}
                    <p className="mobile-menu__trust-line">
                        Cash on Delivery • Pan India Shipping • Easy Exchange
                    </p>

                    {/* Section: Heritage Weaves */}
                    <div className="mobile-menu__section">
                        <h3 className="mobile-menu__section-title">Heritage Weaves</h3>
                        <ul className="mobile-menu__list">
                            <li>
                                <a href="/kanjeevaram-silk" className="mobile-menu__item" onClick={onClose}>
                                    Kanjeevaram Silk
                                </a>
                            </li>
                            <li>
                                <a href="/paithani-silk" className="mobile-menu__item" onClick={onClose}>
                                    Paithani Silk
                                </a>
                            </li>
                            <li>
                                <a href="/banarasi-silk" className="mobile-menu__item" onClick={onClose}>
                                    Banarasi Silk
                                </a>
                            </li>
                            <li>
                                <a href="/gadwal-pochampally" className="mobile-menu__item" onClick={onClose}>
                                    Gadwal & Pochampally
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Section: Why Aviravastra */}
                    <div className="mobile-menu__section">
                        <h3 className="mobile-menu__section-title">Why Aviravastra</h3>
                        <ul className="mobile-menu__list">
                            <li>
                                <a href="/our-story" className="mobile-menu__item" onClick={onClose}>
                                    Our Story & Values
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <a href="/contact" className="mobile-menu__link" onClick={onClose}>
                        Contact Us
                    </a>

                </div>

                {/* WhatsApp CTA - Fixed at Bottom */}
                <a
                    href="https://wa.me/919876543210"
                    className="mobile-menu__whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="mobile-menu__whatsapp-dot" aria-hidden="true" />
                    <div className="mobile-menu__whatsapp-text">
                        <span className="mobile-menu__whatsapp-title">Get Saree Help on WhatsApp</span>
                        <span className="mobile-menu__whatsapp-subtitle">Personal assistance from our family</span>
                    </div>
                </a>

            </nav>
        </>
    );
};

export default MobileMenu;
