/**
 * Custom Hook: useCollections
 * Professional hook for fetching and managing collections
 * Fixed: Infinite loop issue
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { collectionsAPI } from '../services/api';

/**
 * Hook to fetch and manage collections
 * @param {Object} options - Hook options
 * @param {boolean} options.autoFetch - Auto fetch on mount (default: true)
 * @returns {Object} Collections data and methods
 */
export const useCollections = (options = {}) => {
    const { autoFetch = true } = options;

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Use ref to track if initial fetch is done
    const hasFetched = useRef(false);

    const fetchCollections = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await collectionsAPI.getAll();
            setCollections(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Failed to fetch collections');
            setCollections([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        return fetchCollections();
    }, [fetchCollections]);

    useEffect(() => {
        if (autoFetch && !hasFetched.current) {
            hasFetched.current = true;
            fetchCollections();
        }
    }, [autoFetch, fetchCollections]);

    return {
        collections,
        loading,
        error,
        refetch,
    };
};

export default useCollections;
