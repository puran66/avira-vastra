import { useEffect, useState } from 'react';
import '../styles/preloader.css';

const Preloader = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Minimum display time for the luxury feel
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 800); // Match CSS transition
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`preloader ${isExiting ? 'preloader--exit' : ''}`}>
            <div className="preloader__content">
                <div className="preloader__logo">
                    <span className="logo-text">aviravastra</span>
                </div>
                <div className="preloader__line-wrapper">
                    <div className="preloader__line"></div>
                </div>
                <p className="preloader__tagline">The Art of Timeless Weaves</p>
            </div>
        </div>
    );
};

export default Preloader;
