import React, { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import HeroPage from 'src/pages/hero';
import LoginPage from 'src/pages/login';
import SignUpPage from 'src/pages/signup';
import { MainContext } from '../contexts/MainContext';

const AppPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

export default function AppRouter() {
  const { currentUser } = useContext(MainContext);

  if (currentUser === undefined) {
    // If currentUser is undefined, show a loading screen
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={currentUser === null ? <HeroPage /> : <Navigate to="/app" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="app/*"
        element={
          <DashboardLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route index element={<AppPage />} />
                <Route path="user" element={<UserPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="blog" element={<BlogPage />} />
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
