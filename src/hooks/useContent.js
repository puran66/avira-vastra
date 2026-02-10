import { useState, useEffect } from 'react';
import { contentAPI } from '../services/api';

export const useContent = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await contentAPI.getAll();
                setContent(data);
            } catch (err) {
                console.error('Failed to load content', err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    return { content, loading };
};
