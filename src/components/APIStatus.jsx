/**
 * API Connection Status Component
 * Professional backend connection indicator
 */

import { useState, useEffect } from 'react';
import { healthCheck } from '../services/api';

const APIStatus = () => {
    const [status, setStatus] = useState('checking');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await healthCheck();
                if (response.status === 'success') {
                    setStatus('connected');
                    // Auto-hide after 3 seconds if connected
                    setTimeout(() => setIsVisible(false), 3000);
                } else {
                    setStatus('error');
                }
            } catch (error) {
                setStatus('disconnected');
            }
        };

        checkConnection();

        // Re-check every 30 seconds
        const interval = setInterval(checkConnection, 30000);
        return () => clearInterval(interval);
    }, []);

    if (!isVisible && status === 'connected') return null;

    const statusConfig = {
        checking: {
            bg: '#fef3c7',
            color: '#92400e',
            border: '#fbbf24',
            text: '🔄 Connecting to backend...',
        },
        connected: {
            bg: '#d1fae5',
            color: '#065f46',
            border: '#10b981',
            text: '✅ Backend connected',
        },
        disconnected: {
            bg: '#fee2e2',
            color: '#991b1b',
            border: '#ef4444',
            text: '❌ Backend offline - Using fallback data',
        },
        error: {
            bg: '#fed7aa',
            color: '#9a3412',
            border: '#f97316',
            text: '⚠️ Backend error',
        },
    };

    const config = statusConfig[status];

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                zIndex: 9999,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                backgroundColor: config.bg,
                color: config.color,
                border: `1px solid ${config.border}`,
                transition: 'all 0.3s ease',
                cursor: status === 'connected' ? 'pointer' : 'default',
            }}
            onClick={() => status === 'connected' && setIsVisible(false)}
        >
            {config.text}
        </div>
    );
};

export default APIStatus;
