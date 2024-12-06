import React from 'react';
import { X, Users, Building, Briefcase, TrendingUp, Share2, UserPlus } from 'lucide-react';
import ConnectionsGraph from './ConnectionsGraph';
import IndustryDistribution from './IndustryDistribution';
import GrowthMetrics from './GrowthMetrics';
import { useNetworkAnalytics } from '../../hooks/useNetworkAnalytics';

interface NetworkAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NetworkAnalysisModal({ isOpen, onClose }: NetworkAnalysisModalProps) {
  const { data, loading, error } = useNetworkAnalytics();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Network Analysis</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Analyzing your network...</p>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">
              <p>{error}</p>
            </div>
          ) : (
            <div className="p-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricCard
                  title="Total Connections"
                  value={data.totalConnections}
                  change={data.connectionGrowth}
                  icon={Users}
                />
                <MetricCard
                  title="Companies Reached"
                  value={data.companiesReached}
                  change={data.companyGrowth}
                  icon={Building}
                />
                <MetricCard
                  title="Industries Covered"
                  value={data.industriesCovered}
                  change={data.industryGrowth}
                  icon={Briefcase}
                />
              </div>

              {/* Network Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Connection Growth</h3>
                  <ConnectionsGraph data={data.growthData} />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Industry Distribution</h3>
                  <IndustryDistribution data={data.industryData} />
                </div>
              </div>

              {/* Growth Metrics */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Network Growth Metrics</h3>
                <GrowthMetrics data={data.growthMetrics} />
              </div>

              {/* Recommendations */}
              <div className="mt-8 bg-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Growth Opportunities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.recommendations.map((rec, index) => (
                    <RecommendationCard key={index} {...rec} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

function MetricCard({ title, value, change, icon: Icon }: MetricCardProps) {
  const isPositive = !change.startsWith('-');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-lg bg-indigo-50">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className={`ml-2 text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RecommendationCardProps {
  title: string;
  description: string;
  action: string;
  type: 'connect' | 'engage' | 'share';
}

function RecommendationCard({ title, description, action, type }: RecommendationCardProps) {
  const icons = {
    connect: UserPlus,
    engage: Share2,
    share: TrendingUp,
  };
  
  const Icon = icons[type];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start">
        <div className="p-2 rounded-lg bg-indigo-100">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="ml-4">
          <h4 className="text-base font-medium text-gray-900">{title}</h4>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <button className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            {action} →
          </button>
        </div>
      </div>
    </div>
  );
}