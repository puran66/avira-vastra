import '../styles/story.css';

const StoryPage = () => {
    return (
        <div className="story-page">
            <div className="story-container">
                <header className="story-header">
                    <span className="story-pretitle">Our Heritage</span>
                    <h1 className="story-title">The Legend of AviraVastra</h1>
                </header>

                <section className="story-hero-section">
                    <img
                        src="https://images.unsplash.com/photo-1621112904887-419379ce6824?w=1600&q=90"
                        alt="Handloom Artisan Weaving"
                        className="story-hero-image"
                    />
                </section>

                <div className="story-content">
                    <section className="story-section">
                        <div className="story-section-info">
                            <h2 className="story-section-title">A Legacy Born in Surat</h2>
                            <p className="story-text">
                                Founded in the heart of India's textile capital, AviraVastra began as a small family dream
                                to preserve the sanctity of traditional Indian weaves. For three generations, our family
                                has worked directly with master weavers to bring you sarees that aren't just garments,
                                but inherited stories.
                            </p>
                        </div>
                        <div className="story-section-image">
                            <img src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=80" alt="Silk Threads" style={{ width: '100%', borderRadius: '4px' }} />
                        </div>
                    </section>

                    <section className="story-section">
                        <h2 className="story-section-title">Our Values</h2>
                        <div className="values-grid">
                            <div className="value-item">
                                <h3 className="value-title">Authenticity</h3>
                                <p className="value-text">Every thread is verified for quality and heritage accuracy.</p>
                            </div>
                            <div className="value-item">
                                <h3 className="value-title">Artisan First</h3>
                                <p className="value-text">We ensure fair wages and sustainable livelihoods for our weaving families.</p>
                            </div>
                            <div className="value-item">
                                <h3 className="value-title">Timelessness</h3>
                                <p className="value-text">We design for longevity, creating pieces to be passed through generations.</p>
                            </div>
                        </div>
                    </section>

                    <section className="story-section">
                        <h2 className="story-section-title">The Human Touch</h2>
                        <p className="story-text">
                            In a world of mass production, we celebrate the beautiful "impurities" of handloom.
                            The slight variation in a weave is the signature of the man or woman who sat behind
                            the loom for weeks to create your saree.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default StoryPage;
