/**
 * NewArrivals Component
 * Premium Traditional Saree Brand - Mobile First
 * Professional implementation with custom hooks
 */

import { useProducts } from '../hooks/useProducts';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';
import '../styles/new-arrivals.css';

const NewArrivals = () => {
    const addItem = useCartStore((state) => state.addItem);

    // Fetch latest 4 products
    const { products, loading, error } = useProducts({ limit: 4, isActive: true });

    const handleAddToCart = (e, product) => {
        e.preventDefault(); // Prevent navigating to detail page when clicking button
        addItem(product);
        toast.success(`${product.name} added to bag!`);
    };

    // Format product data for display
    const formatProduct = (product) => ({
        id: product._id,
        name: product.name,
        price: product.discountedPrice
            ? `₹${product.discountedPrice.toLocaleString('en-IN')}`
            : `₹${product.price.toLocaleString('en-IN')}`,
        originalPrice: product.discountedPrice
            ? `₹${product.price.toLocaleString('en-IN')}`
            : null,
        image: product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80',
        link: `/product/${product._id}`,
        urgency: product.stock < 5 ? 'Limited pieces' : 'Fresh arrival',
        hasDiscount: !!product.discountedPrice
    });

    const displayProducts = products.map(formatProduct);

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

                {/* Loading State */}
                {loading && (
                    <div className="new-arrivals__loading">
                        <div className="loading-spinner"></div>
                        <p>Loading latest arrivals...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="new-arrivals__error">
                        <p>Unable to load products. Please try again later.</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && displayProducts.length === 0 && (
                    <div className="new-arrivals__empty">
                        <p>No products available at the moment.</p>
                        <p className="new-arrivals__empty-subtitle">Check back soon for new arrivals!</p>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && displayProducts.length > 0 && (
                    <div className="new-arrivals__grid">
                        {displayProducts.map((product) => (
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
                                        loading="lazy"
                                    />
                                    {product.hasDiscount && (
                                        <span className="product-card__badge">Sale</span>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="product-card__info">
                                    <p className="product-card__urgency">{product.urgency}</p>
                                    <h3 className="product-card__name">{product.name}</h3>
                                    <div className="product-card__pricing">
                                        <p className="product-card__price">{product.price}</p>
                                        {product.originalPrice && (
                                            <p className="product-card__original-price">{product.originalPrice}</p>
                                        )}
                                    </div>
                                    <p className="product-card__trust">
                                        Quality checked by our family
                                    </p>
                                    <button
                                        className="product-card__add-btn"
                                        onClick={(e) => handleAddToCart(e, products.find(p => p._id === product.id))}
                                    >
                                        Add to Bag
                                    </button>
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* View All Link */}
                {!loading && displayProducts.length > 0 && (
                    <div className="new-arrivals__footer">
                        <a href="/sarees" className="new-arrivals__view-all">
                            View All Sarees
                            <span className="new-arrivals__arrow" aria-hidden="true">→</span>
                        </a>
                        <p className="new-arrivals__help-line">
                            Need help choosing? WhatsApp us anytime.
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default NewArrivals;
