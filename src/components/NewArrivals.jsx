/**
 * NewArrivals Component
 * Premium Traditional Saree Brand - Mobile First
 * "Achha collection hai — ab dekhte hain"
 */

import '../styles/new-arrivals.css';

const NewArrivals = () => {
    const products = [
        {
            id: 1,
            name: 'Maroon Kanjeevaram Silk',
            price: '₹12,500',
            image: '/product-1.png',
            link: '/product/maroon-kanjeevaram-silk',
            urgency: 'Limited pieces'
        },
        {
            id: 2,
            name: 'Royal Blue Banarasi Silk',
            price: '₹9,800',
            image: '/product-2.png',
            link: '/product/royal-blue-banarasi-silk',
            urgency: 'Fresh arrival'
        },
        {
            id: 3,
            name: 'Peach Paithani Silk',
            price: '₹14,200',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80',
            link: '/product/peach-paithani-silk',
            urgency: 'Seasonal selection'
        },
        {
            id: 4,
            name: 'Green Gadwal Silk',
            price: '₹8,500',
            image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80',
            link: '/product/green-gadwal-silk',
            urgency: 'Limited pieces'
        }
    ];

    return (
        <section className="new-arrivals">
            <div className="new-arrivals__container">

                {/* Section Header */}
                <div className="new-arrivals__header">
                    <h2 className="new-arrivals__title">New Arrivals</h2>
                    <p className="new-arrivals__subtitle">
                        Freshly curated sarees from Surat
                    </p>
                    <p className="new-arrivals__trust-line">
                        Direct from Surat • No middlemen • Honest pricing
                    </p>
                </div>

                {/* Product Grid */}
                <div className="new-arrivals__grid">
                    {products.map((product) => (
                        <a
                            key={product.id}
                            href={product.link}
                            className="product-card"
                        >
                            {/* Product Image */}
                            <div className="product-card__image-wrapper">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-card__image"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="product-card__info">
                                <p className="product-card__urgency">{product.urgency}</p>
                                <h3 className="product-card__name">{product.name}</h3>
                                <p className="product-card__price">{product.price}</p>
                                <p className="product-card__trust">
                                    Quality checked by our family
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* View All Link */}
                <div className="new-arrivals__footer">
                    <a href="/sarees" className="new-arrivals__view-all">
                        View All Sarees
                        <span className="new-arrivals__arrow" aria-hidden="true">→</span>
                    </a>
                    <p className="new-arrivals__help-line">
                        Need help choosing? WhatsApp us anytime.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default NewArrivals;
