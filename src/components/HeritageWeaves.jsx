/**
 * HeritageWeaves Component
 * Premium Traditional Saree Brand - Mobile First
 * Cultural credibility and pride
 */

import '../styles/heritage-weaves.css';

const HeritageWeaves = () => {
    const weaves = [
        {
            id: 'kanjeevaram',
            title: 'Kanjeevaram Silk',
            subtitle: 'Traditionally worn during muhurat and sacred ceremonies',
            image: '/kanjeevaram-silk.png',
            link: '/kanjeevaram-silk',
            overlayLight: true
        },
        {
            id: 'paithani',
            title: 'Paithani Silk',
            subtitle: 'A Maharashtrian tradition for weddings and rituals',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
            link: '/paithani-silk',
            overlayLight: false
        },
        {
            id: 'banarasi',
            title: 'Banarasi Silk',
            subtitle: 'A symbol of auspicious beginnings',
            image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80',
            link: '/banarasi-silk',
            overlayLight: true
        },
        {
            id: 'gadwal',
            title: 'Gadwal & Pochampally',
            subtitle: 'Favoured for pujas and sacred days',
            image: 'https://images.unsplash.com/photo-1583391733981-5acd1d5d4f88?w=600&q=80',
            link: '/gadwal-pochampally',
            overlayLight: false
        }
    ];

    return (
        <section className="heritage-weaves">
            <div className="heritage-weaves__container">

                {/* Section Header */}
                <div className="heritage-weaves__header">
                    <h2 className="heritage-weaves__title">Our Heritage Weaves</h2>
                    <p className="heritage-weaves__subtitle">
                        Timeless traditions honoured across generations
                    </p>
                </div>

                {/* Weaves Cards */}
                <div className="heritage-weaves__grid">
                    {weaves.map((weave) => (
                        <a
                            key={weave.id}
                            href={weave.link}
                            className={`weave-card ${weave.overlayLight ? 'weave-card--light-overlay' : ''}`}
                        >
                            {/* Image */}
                            <div className="weave-card__image-wrapper">
                                <img
                                    src={weave.image}
                                    alt={`${weave.title} - ${weave.subtitle}`}
                                    className="weave-card__image"
                                />
                                {/* Soft Overlay */}
                                <div className="weave-card__overlay" aria-hidden="true" />
                            </div>

                            {/* Content */}
                            <div className="weave-card__content">
                                <h3 className="weave-card__title">{weave.title}</h3>
                                <p className="weave-card__subtitle">{weave.subtitle}</p>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HeritageWeaves;
