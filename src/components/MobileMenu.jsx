import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import '../styles/mobile-menu.css';

const MobileMenu = ({ isOpen, onClose }) => {
    const { content } = useContent();
    const whatsappClean = content?.whatsappNumber?.replace(/\+/g, '') || '918780055674';

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
                    <Link to="/" className="mobile-menu__link" onClick={onClose}>
                        Home
                    </Link>

                    {/* Section: Shop by Occasion */}
                    <div className="mobile-menu__section">
                        <h3 className="mobile-menu__section-title">Shop by Occasion</h3>
                        <ul className="mobile-menu__list">
                            <li>
                                <Link to="/products?search=Wedding" className="mobile-menu__item" onClick={onClose}>
                                    Wedding Sarees
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?search=Festival" className="mobile-menu__item" onClick={onClose}>
                                    Festival & Puja Sarees
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?search=Family" className="mobile-menu__item" onClick={onClose}>
                                    Family Functions
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?search=Gift" className="mobile-menu__item" onClick={onClose}>
                                    Auspicious Gifting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Primary Action: New Arrivals */}
                    <Link to="/products?search=New" className="mobile-menu__primary-link" onClick={onClose}>
                        New Arrivals
                        <span className="mobile-menu__arrow">→</span>
                    </Link>

                    {/* Trust Line */}
                    <p className="mobile-menu__trust-line">
                        Cash on Delivery • Pan India Shipping • Easy Exchange
                    </p>

                    {/* Section: Heritage Weaves */}
                    <div className="mobile-menu__section">
                        <h3 className="mobile-menu__section-title">Heritage Weaves</h3>
                        <ul className="mobile-menu__list">
                            <li>
                                <Link to="/products?search=Kanjeevaram" className="mobile-menu__item" onClick={onClose}>
                                    Kanjeevaram Silk
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?search=Paithani" className="mobile-menu__item" onClick={onClose}>
                                    Paithani Silk
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?search=Banarasi" className="mobile-menu__item" onClick={onClose}>
                                    Banarasi Silk
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?search=Silk" className="mobile-menu__item" onClick={onClose}>
                                    Pure Silk Collection
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Section: Why Aviravastra */}
                    <div className="mobile-menu__section">
                        <h3 className="mobile-menu__section-title">Why Aviravastra</h3>
                        <ul className="mobile-menu__list">
                            <li>
                                <Link to="/our-story" className="mobile-menu__item" onClick={onClose}>
                                    Our Story & Values
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <Link to="/contact" className="mobile-menu__link" onClick={onClose}>
                        Contact Us
                    </Link>

                </div>

                {/* WhatsApp CTA - Fixed at Bottom */}
                <a
                    href={`https://wa.me/${whatsappClean}`}
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
