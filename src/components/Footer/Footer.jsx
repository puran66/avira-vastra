/**
 * Footer Component
 * Premium Traditional Saree Brand - Mobile First
 * Respectful goodbye, not marketing block
 */

import '../../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">

                {/* Brand Block */}
                <div className="footer__brand">
                    <h2 className="footer__brand-name">AviraVastra</h2>
                    <p className="footer__brand-tagline">
                        Chosen with care for life’s sacred moments
                    </p>
                    <p className="footer__brand-human">
                        Family-run Surat saree brand.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="footer__sections">

                    {/* Explore Section */}
                    <div className="footer__section">
                        <h3 className="footer__section-title">Explore</h3>
                        <ul className="footer__links">
                            <li>
                                <a href="/wedding-sarees" className="footer__link">
                                    Wedding Sarees
                                </a>
                            </li>
                            <li>
                                <a href="/festival-puja-sarees" className="footer__link">
                                    Festival & Puja Sarees
                                </a>
                            </li>
                            <li>
                                <a href="/new-arrivals" className="footer__link">
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a href="/heritage-weaves" className="footer__link">
                                    Heritage Weaves
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Help Section */}
                    <div className="footer__section">
                        <h3 className="footer__section-title">Help</h3>
                        <ul className="footer__links">
                            <li>
                                <a href="/our-story" className="footer__link">
                                    Our Story
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="footer__link">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="/exchange-policy" className="footer__link">
                                    Exchange Policy
                                </a>
                            </li>
                            <li>
                                <a href="/shipping" className="footer__link">
                                    Shipping Information
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Trust Line */}
                <p className="footer__trust-line">
                    Cash on Delivery • Pan-India Shipping • Easy Exchange
                </p>

                {/* Copyright */}
                <p className="footer__copyright">
                    © AviraVastra. All rights reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;
