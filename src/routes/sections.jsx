import { lazy, Suspense, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useLocation, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import HeroPage from '@pages/hero';
import LoginPage from '@pages/login';
import SignUpPage from '@pages/signup';
import { MainContext } from '../contexts/MainContext';

const AppPage = lazy(() => import('@pages/app'));
const MorningPage = lazy(() => import('@pages/morning'));
const BlogPage = lazy(() => import('@pages/blog'));
const UserPage = lazy(() => import('@pages/user'));
const ProductsPage = lazy(() => import('@pages/products'));
const MoodPage = lazy(() => import('@pages/mood'));
const SleepPage = lazy(() => import('@pages/sleep'));
const ActivityPage = lazy(() => import('@pages/activity'));
const AnalysisPage = lazy(() => import('@pages/analysis'));
const SettingsPage = lazy(() => import('@pages/settings'));
const TypographyPage = lazy(() => import('@pages/typography'));
const Page404 = lazy(() => import('@pages/page-not-found'));

// Custom loading skeleton
const LoadingSkeleton = () => (
  <div>
    <Skeleton variant="text" width={210} height={60} />
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="rectangular" width={210} height={118} />
  </div>
);

// Utility function to parse query string into an object
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function AppRouter() {
  const { currentUser, setCode } = useContext(MainContext);
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const code = query.get('code');
    if (code) {
      setCode(code);
      navigate('app/settings');
    }
  }, []);

  if (currentUser === undefined) {
    // If currentUser is undefined, show a skeleton instead of a simple loading text
    return <LoadingSkeleton />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={currentUser === null ? <HeroPage /> : <Navigate to="/app" replace />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="app/*"
        element={
          <DashboardLayout>
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route index element={<AppPage />} />
                <Route path="morning" element={<MorningPage />} />
                <Route path="mood" element={<MoodPage />} />
                <Route path="sleep" element={<SleepPage />} />
                <Route path="activity" element={<ActivityPage />} />
                <Route path="analysis" element={<AnalysisPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="typography" element={<TypographyPage />} />

                {/* template (to get rid of) */}
                <Route path="user" element={<UserPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </DashboardLayout>
        }
      />
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
