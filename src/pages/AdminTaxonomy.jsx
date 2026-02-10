import { useState, useEffect } from 'react';
import { occasionsAPI, collectionsAPI, uploadAPI } from '../services/api';
import toast from 'react-hot-toast';

const AdminTaxonomy = () => {
    const [occasions, setOccasions] = useState([]);
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('occasions');

    const [form, setForm] = useState({
        title: '',
        subtitle: '',
        slug: '',
        image: '',
        sortOrder: 0
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [oData, cData] = await Promise.all([
                occasionsAPI.getAll(),
                collectionsAPI.getAll()
            ]);
            setOccasions(oData);
            setCollections(cData);
        } catch (err) {
            toast.error('Failed to load taxonomy data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const fd = new FormData();
        fd.append('image', file);

        try {
            const res = await uploadAPI.uploadImage(fd);
            setForm({ ...form, image: res.url });
            toast.success('Media uploaded');
        } catch (err) {
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const api = activeTab === 'occasions' ? occasionsAPI : collectionsAPI;

        try {
            if (editingId) {
                await api.update(editingId, form);
                toast.success('Updated successfully');
            } else {
                await api.create(form);
                toast.success('Created successfully');
            }
            setForm({ title: '', subtitle: '', slug: '', image: '', sortOrder: 0 });
            setEditingId(null);
            fetchData();
        } catch (err) {
            toast.error(err.message || 'Error occurred');
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setForm({
            title: item.title,
            subtitle: item.subtitle || '',
            slug: item.slug || item.title.toLowerCase().replace(/ /g, '-'),
            image: item.image,
            sortOrder: item.sortOrder || 0
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this tag? This may affect product visibility.')) {
            const api = activeTab === 'occasions' ? occasionsAPI : collectionsAPI;
            try {
                await api.delete(id);
                toast.success('Deleted');
                fetchData();
            } catch (err) {
                toast.error('Failed to delete');
            }
        }
    };

    if (loading) return <div className="admin-loading">Loading Taxonomies...</div>;

    const dataList = activeTab === 'occasions' ? occasions : collections;

    return (
        <div className="admin-taxonomy">
            <h2 className="admin-title">Taxonomy Management</h2>

            <div className="admin-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    className={`admin-btn ${activeTab === 'occasions' ? 'admin-btn--primary' : 'admin-btn--outline'}`}
                    onClick={() => { setActiveTab('occasions'); setEditingId(null); }}
                >
                    Occasions
                </button>
                <button
                    className={`admin-btn ${activeTab === 'collections' ? 'admin-btn--primary' : 'admin-btn--outline'}`}
                    onClick={() => { setActiveTab('collections'); setEditingId(null); }}
                >
                    Heritage Collections
                </button>
            </div>

            <div className="admin-grid-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="admin-card">
                    <h3>{editingId ? 'Edit Item' : 'Add New Item'}</h3>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Slug</label>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Subtitle</label>
                            <input
                                type="text"
                                value={form.subtitle}
                                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Cover Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                style={{ marginBottom: '1rem' }}
                            />
                            {form.image && (
                                <div style={{ position: 'relative', width: '100%', height: '120px', marginBottom: '1rem' }}>
                                    <img src={form.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                    {uploading && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>Updating...</div>}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Sort Order</label>
                            <input
                                type="number"
                                value={form.sortOrder}
                                onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                            />
                        </div>
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                            <button type="submit" className="admin-btn admin-btn--primary" style={{ flex: 1 }}>
                                {editingId ? 'Update' : 'Create'}
                            </button>
                            {editingId && (
                                <button type="button" className="admin-btn admin-btn--outline" onClick={() => { setEditingId(null); setForm({ title: '', subtitle: '', slug: '', image: '', sortOrder: 0 }); }}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="admin-card">
                    <h3>Active {activeTab === 'occasions' ? 'Occasions' : 'Collections'}</h3>
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Order</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <img src={item.image} alt="" style={{ width: '50px', height: '30px', objectFit: 'cover', borderRadius: '4px' }} />
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#666' }}>{item.slug}</div>
                                        </td>
                                        <td>{item.sortOrder}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="admin-btn admin-btn--outline" onClick={() => handleEdit(item)}>Edit</button>
                                                <button className="admin-btn admin-btn--outline" style={{ color: 'var(--admin-danger)' }} onClick={() => handleDelete(item._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTaxonomy;
