/**
 * Custom Hook: useOccasions
 * Professional hook for fetching and managing occasions
 * Fixed: Infinite loop issue
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { occasionsAPI } from '../services/api';

/**
 * Hook to fetch and manage occasions
 * @param {Object} options - Hook options
 * @param {boolean} options.autoFetch - Auto fetch on mount (default: true)
 * @returns {Object} Occasions data and methods
 */
export const useOccasions = (options = {}) => {
    const { autoFetch = true } = options;

    const [occasions, setOccasions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Use ref to track if initial fetch is done
    const hasFetched = useRef(false);

    const fetchOccasions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await occasionsAPI.getAll();
            setOccasions(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Failed to fetch occasions');
            setOccasions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        return fetchOccasions();
    }, [fetchOccasions]);

    useEffect(() => {
        if (autoFetch && !hasFetched.current) {
            hasFetched.current = true;
            fetchOccasions();
        }
    }, [autoFetch, fetchOccasions]);

    return {
        occasions,
        loading,
        error,
        refetch,
    };
};

/**
 * Hook to fetch single occasion
 * @param {string} occasionId - Occasion ID
 * @returns {Object} Occasion data and methods
 */
export const useOccasion = (occasionId) => {
    const [occasion, setOccasion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOccasion = useCallback(async () => {
        if (!occasionId) return;

        try {
            setLoading(true);
            setError(null);

            const data = await occasionsAPI.getById(occasionId);
            setOccasion(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch occasion');
            setOccasion(null);
        } finally {
            setLoading(false);
        }
    }, [occasionId]);

    useEffect(() => {
        fetchOccasion();
    }, [fetchOccasion]);

    return {
        occasion,
        loading,
        error,
        refetch: fetchOccasion,
    };
};

export default useOccasions;
