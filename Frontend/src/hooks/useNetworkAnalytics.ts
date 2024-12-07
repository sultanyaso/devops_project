import { useState, useEffect } from 'react';
import { fetchNetworkAnalytics } from '../services/networkService';

interface NetworkAnalytics {
  totalConnections: string;
  connectionGrowth: string;
  companiesReached: string;
  companyGrowth: string;
  industriesCovered: string;
  industryGrowth: string;
  growthData: Array<{
    date: string;
    connections: number;
  }>;
  industryData: Array<{
    industry: string;
    value: number;
  }>;
  growthMetrics: Array<{
    metric: string;
    current: number;
    previous: number;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    action: string;
    type: 'connect' | 'engage' | 'share';
  }>;
}

export function useNetworkAnalytics() {
  const [data, setData] = useState<NetworkAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNetworkAnalytics() {
      try {
        setLoading(true);
        const analytics = await fetchNetworkAnalytics();
        setData(analytics);
        setError(null);
      } catch (err) {
        setError('Failed to load network analytics. Please try again later.');
        console.error('Error loading network analytics:', err);
      } finally {
        setLoading(false);
      }
    }

    loadNetworkAnalytics();
  }, []);

  return { data, loading, error };
}