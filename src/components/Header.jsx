/**
 * Header Component
 * Premium Traditional Saree Brand - Mobile First
 * Calm, elegant, respectful, minimal
 */

import '../styles/header.css';

const Header = ({ onMenuOpen, isScrolled }) => {
    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            {/* Top Bar - Premium Global Announcement */}
            <div className="header__topbar">
                <span className="header__tagline">The Heritage Collection: Now Shipping Globally</span>
            </div>

            {/* Main Header Row */}
            <div className="header__main">
                {/* Left - Menu Toggle (Burger) */}
                <div className="header__left">
                    <button
                        className="header__icon-btn"
                        aria-label="Open menu"
                        onClick={onMenuOpen}
                    >
                        <svg
                            className="header__icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1" /* Ultra-thin line */
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="17" x2="20" y2="17" />
                        </svg>
                    </button>

                    {/* Search - Visible on larger mobile/tablet */}
                    <button className="header__icon-btn header__icon-btn--desktop-only" aria-label="Search">
                        <svg className="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </div>

                {/* Center - Brand Logo */}
                <div className="header__center">
                    <a href="/" className="header__brand">
                        aviravastra
                    </a>
                </div>

                {/* Right - Profile & Cart */}
                <div className="header__right">
                    <button className="header__icon-btn" aria-label="Account">
                        <svg className="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </button>

                    <button className="header__icon-btn" aria-label="Cart">
                        <svg className="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
