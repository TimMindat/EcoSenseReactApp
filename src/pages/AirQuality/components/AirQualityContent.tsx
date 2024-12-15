import React from 'react';
import { Info, Loader2 } from 'lucide-react';
import { TouchFeedback } from '../../../components/ui/TouchFeedback';

const AirQualityCard = React.lazy(() => import('../../../components/AirQualityCard'));
const WeatherCard = React.lazy(() => import('../../../components/weather/WeatherCard'));
const QualityGuide = React.lazy(() => import('../../../components/QualityGuide'));
const UserInsights = React.lazy(() => import('../../../components/insights/UserInsights'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px] bg-white rounded-lg shadow-lg p-6">
    <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
  </div>
);

export function AirQualityContent() {
  const { type: orientationType } = useOrientation();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <TouchFeedback>
        <div className="text-center">
          <Info className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            Environmental Monitoring
          </h1>
          <p className="mt-2 text-sm text-gray-600 px-4">
            Real-time air quality and weather data
          </p>
        </div>
      </TouchFeedback>

      {/* User Insights Section */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <UserInsights />
        </Suspense>
      </ErrorBoundary>

      {/* Monitoring Cards Section */}
      <div className={`grid gap-4 ${orientationType === 'landscape' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <AirQualityCard />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <WeatherCard />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Quality Guide Section */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <QualityGuide />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}