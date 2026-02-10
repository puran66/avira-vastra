import { useState, useEffect } from 'react';
import { contentAPI, uploadAPI } from '../services/api';
import toast from 'react-hot-toast';

const AdminContent = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const data = await contentAPI.getAll();
            setContent(data);
        } catch (err) {
            toast.error('Failed to load content settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await contentAPI.update(content);
            toast.success('Website content updated successfully');
        } catch (err) {
            toast.error('Failed to update content');
        } finally {
            setSaving(false);
        }
    };

    const handleHeroUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const fd = new FormData();
        fd.append('image', file);

        try {
            const res = await uploadAPI.uploadImage(fd);
            handleChange('heroImage', res.url);
            toast.success('Hero image uploaded');
        } catch (err) {
            toast.error('Hero upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (field, value) => {
        setContent({ ...content, [field]: value });
    };

    if (loading) return <div className="admin-loading">Loading Content Settings...</div>;
    if (!content) return <div className="admin-error">Failed to load content settings. Please refresh.</div>;

    return (
        <div className="admin-content-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="admin-title">Website Content Management</h2>
                <button
                    className="admin-btn admin-btn--primary"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            <div className="admin-grid-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Hero Section */}
                <div className="admin-card">
                    <h3>Hero Section</h3>
                    <div className="admin-form">
                        <div className="form-group">
                            <label>Hero Headline</label>
                            <input
                                type="text"
                                value={content.heroTitle}
                                onChange={(e) => handleChange('heroTitle', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Hero Subtitle</label>
                            <textarea
                                rows="3"
                                value={content.heroSubtitle}
                                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Hero Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleHeroUpload}
                                style={{ marginBottom: '1rem' }}
                            />
                            <div style={{ position: 'relative', marginTop: '1rem' }}>
                                <img src={content.heroImage} alt="Hero Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                                {uploading && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>Uploading Heritage Media...</div>}
                                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>Hero Preview (Aspect Ratio 16:9 recommended)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust & Announcement */}
                <div className="admin-card">
                    <h3>Announcement & Trust Banner</h3>
                    <div className="admin-form">
                        <div className="form-group">
                            <label>Banner Text</label>
                            <input
                                type="text"
                                value={content.bannerText}
                                onChange={(e) => handleChange('bannerText', e.target.value)}
                            />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <input
                                type="checkbox"
                                checked={content.showBanner}
                                onChange={(e) => handleChange('showBanner', e.target.checked)}
                                style={{ width: 'auto' }}
                            />
                            <label style={{ margin: 0 }}>Show Announcement Banner</label>
                        </div>
                        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--admin-border)' }} />

                        <h3>Global Brand Contacts</h3>
                        <div className="form-group">
                            <label>WhatsApp Number (with country code)</label>
                            <input
                                type="text"
                                value={content.whatsappNumber}
                                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Instagram URL</label>
                            <input
                                type="text"
                                value={content.instagramUrl}
                                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Customer Care Email</label>
                            <input
                                type="text"
                                value={content.footerEmail}
                                onChange={(e) => handleChange('footerEmail', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer and Policy */}
                <div className="admin-card">
                    <h3>Footer About Section</h3>
                    <div className="admin-form">
                        <div className="form-group">
                            <label>Footer Brand Description</label>
                            <textarea
                                rows="4"
                                value={content.footerAbout}
                                onChange={(e) => handleChange('footerAbout', e.target.value)}
                            />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <input
                                type="checkbox"
                                checked={content.showFloatingWhatsapp}
                                onChange={(e) => handleChange('showFloatingWhatsapp', e.target.checked)}
                                style={{ width: 'auto' }}
                            />
                            <label style={{ margin: 0 }}>Show Floating WhatsApp Button</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminContent;
