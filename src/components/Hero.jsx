/**
 * Hero Component
 * Premium Traditional Saree Brand - Mobile First
 * Sacred, warm, confident
 */

import '../styles/hero.css';

const Hero = () => {
    return (
        <section className="hero">
            {/* Cinematic Background Video */}
            <div className="hero__video-wrapper">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80"
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
                        The Art of the Weave:<br />
                        Timeless Silks for the<br />
                        Modern Heirloom
                    </h1>

                    <p className="hero__subtext">
                        For weddings, pujas at home, and the most auspicious moments in a family’s journey.
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
