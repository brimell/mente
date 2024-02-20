import React, { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import DashboardLayout from '../layouts/dashboard';
import HeroPage from 'src/pages/hero';
import LoginPage from 'src/pages/login';
import SignUpPage from 'src/pages/signup';
import { MainContext } from '../contexts/MainContext';

const AppPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const ProductsPage = lazy(() => import('src/pages/products'));
const SettingsPage = lazy(() => import('src/pages/settings'));
const TypographyPage = lazy(() => import('src/pages/typography'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

// Custom loading skeleton
const LoadingSkeleton = () => (
  <div>
    <Skeleton variant="text" width={210} height={60} />
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="rectangular" width={210} height={118} />
  </div>
);

export default function AppRouter() {
  const { currentUser } = useContext(MainContext);

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
                <Route path="mood" element={<UserPage />} />
                <Route path="sleep" element={<ProductsPage />} />
                <Route path="activity" element={<BlogPage />} />
                <Route path="analysis" element={<BlogPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="typography" element={<TypographyPage />} />
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
