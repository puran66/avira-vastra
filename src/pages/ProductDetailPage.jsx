/**
 * Product Detail Page
 * Full product view with gallery and add to bag
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import useCartStore from '../store/cartStore';
import SectionLoader from '../components/SectionLoader';
import toast from 'react-hot-toast';
import '../styles/product-detail.css';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const data = await productsAPI.getById(id);
            setProduct(data);
        } catch (error) {
            toast.error('Product not found');
            navigate('/products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    const handleAddToCart = () => {
        addItem(product, quantity);
        toast.success(`${product.name} added to bag!`);
    };

    if (loading) {
        return <SectionLoader message="Unfolding the saree's story..." height="80vh" />;
    }

    if (!product) return null;

    return (
        <div className="product-detail">
            <div className="product-detail__container">
                <div className="product-detail__layout">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <div className="product-gallery__main">
                            <img
                                src={product.images?.[selectedImage] || 'https://via.placeholder.com/600x800'}
                                alt={product.name}
                            />
                        </div>
                        {product.images?.length > 1 && (
                            <div className="product-gallery__thumbs">
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`thumb ${selectedImage === idx ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(idx)}
                                    >
                                        <img src={img} alt={`Thumb ${idx + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <p className="product-category">{product.category?.name || 'Saree'}</p>
                        <h1 className="product-name">{product.name}</h1>

                        <div className="product-pricing">
                            <span className="current-price">₹{product.price.toLocaleString()}</span>
                            {product.discountedPrice && (
                                <span className="original-price">₹{product.discountedPrice.toLocaleString()}</span>
                            )}
                        </div>

                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-meta">
                            {product.weaveType && (
                                <div className="meta-item">
                                    <span className="label">Weave:</span>
                                    <span className="value">{product.weaveType}</span>
                                </div>
                            )}
                            <div className="meta-item">
                                <span className="label">Availability:</span>
                                <span className={`value ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                    {product.stock > 0 ? `In Stock (${product.stock} pieces)` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        <div className="product-actions">
                            <div className="quantity-selector">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className="add-to-bag-btn"
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                            >
                                {product.stock > 0 ? 'Add to Bag' : 'Out of Stock'}
                            </button>
                        </div>

                        <div className="trust-badges">
                            <div className="badge">
                                <span>✅ Quality Checked</span>
                            </div>
                            <div className="badge">
                                <span>🚚 Fast Shipping</span>
                            </div>
                            <div className="badge">
                                <span>🔒 Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
