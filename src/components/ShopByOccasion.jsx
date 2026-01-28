/**
 * ShopByOccasion Component
 * Premium Traditional Saree Brand - Mobile First
 * Immediate answers: "Shaadi ke liye?" "Puja ke liye?"
 */

import '../styles/shop-by-occasion.css';

const ShopByOccasion = () => {
    const occasions = [
        {
            id: 'wedding',
            title: 'Wedding Sarees',
            subtitle: 'For muhurat, sacred vows, and wedding rituals',
            image: '/wedding-saree.png',
            link: '/wedding-sarees'
        },
        {
            id: 'festival',
            title: 'Puja & Temple Sarees',
            subtitle: 'Varalakshmi Vratham, Satyanarayan Puja, temple visits',
            image: 'https://images.unsplash.com/photo-1583391733981-5acd1d5d4f88?w=600&q=80',
            link: '/festival-puja-sarees'
        },
        {
            id: 'family',
            title: 'Family Functions',
            subtitle: 'Griha pravesh, naming ceremonies, special days',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
            link: '/family-functions'
        },
        {
            id: 'gifting',
            title: 'Auspicious Gifting',
            subtitle: 'Haldi-kunku & wedding gifting',
            image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80',
            link: '/auspicious-gifting'
        }
    ];

    return (
        <section className="shop-by-occasion">
            <div className="shop-by-occasion__container">

                {/* Section Header */}
                <div className="shop-by-occasion__header">
                    <h2 className="shop-by-occasion__title">Shop for Sacred Occasions</h2>
                    <p className="shop-by-occasion__subtitle">
                        Find the right saree for every meaningful family moment
                    </p>
                </div>

                {/* Occasion Cards */}
                <div className="shop-by-occasion__grid">
                    {occasions.map((occasion) => (
                        <a
                            key={occasion.id}
                            href={occasion.link}
                            className="occasion-card"
                        >
                            {/* Image */}
                            <div className="occasion-card__image-wrapper">
                                <img
                                    src={occasion.image}
                                    alt={`${occasion.title} - ${occasion.subtitle}`}
                                    className="occasion-card__image"
                                />
                                {/* Gradient Overlay */}
                                <div className="occasion-card__gradient" aria-hidden="true" />
                            </div>

                            {/* Content */}
                            <div className="occasion-card__content">
                                <h3 className="occasion-card__title">
                                    {occasion.title}
                                    <span className="occasion-card__arrow" aria-hidden="true">→</span>
                                </h3>
                                <p className="occasion-card__subtitle">{occasion.subtitle}</p>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ShopByOccasion;
