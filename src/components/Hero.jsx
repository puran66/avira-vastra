/**
 * Hero Component
 * Premium Traditional Saree Brand - Mobile First
 * Sacred, warm, confident
 */

import { useContent } from '../hooks/useContent';
import '../styles/hero.css';

const Hero = () => {
    const { content } = useContent();

    return (
        <section className="hero">
            {/* Cinematic Background Video */}
            <div
                className="hero__video-wrapper"
                style={{
                    backgroundImage: `url(${content?.heroImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80"})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    preload="auto"
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    poster={content?.heroImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80"}
                    className="hero__video"
                >
                    <source
                        src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-woman-wearing-a-saree-40616-large.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                {/* Subtle Luxury Tint Overlay */}
                <div className="hero__overlay" aria-hidden="true" />
            </div>

            {/* Content - Rule of Thirds (Left Aligned) */}
            <div className="hero__content">
                <div className="hero__text-box">
                    <p className="hero__label">Crafted in Surat</p>
                    <h1 className="hero__headline">
                        {content?.heroTitle || "The Art of the Weave: Timeless Silks for the Modern Heirloom"}
                    </h1>

                    <p className="hero__subtext">
                        {content?.heroSubtitle || "For weddings, pujas at home, and the most auspicious moments in a family’s journey."}
                    </p>

                    <div className="hero__actions">
                        <a href="/sarees" className="hero__cta hero__cta--ghost">
                            Discover the Craft
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
