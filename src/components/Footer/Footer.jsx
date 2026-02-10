import { useContent } from '../../hooks/useContent';
import { Link } from 'react-router-dom';
import '../../styles/footer.css';

const Footer = () => {
    const { content } = useContent();

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
                        {content?.footerAbout || 'Every drape from Avira arrives at your door after being personally inspected by our family to ensure the purity of the weave.'}
                    </p>
                </div>

                {/* Footer Links */}
                <div className="footer__sections">

                    {/* Explore Section */}
                    <div className="footer__section">
                        <h3 className="footer__section-title">Explore</h3>
                        <ul className="footer__links">
                            <li>
                                <Link to="/products?search=Wedding" className="footer__link">
                                    Wedding Sarees
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?search=Festival" className="footer__link">
                                    Festival & Puja Sarees
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?search=New" className="footer__link">
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?search=Heritage" className="footer__link">
                                    Heritage Weaves
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Help Section */}
                    <div className="footer__section">
                        <h3 className="footer__section-title">Help</h3>
                        <ul className="footer__links">
                            <li>
                                <Link to="/our-story" className="footer__link">
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="footer__link">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="footer__link">
                                    View All Sarees
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="footer__link">
                                    Shipping & Returns
                                </Link>
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
