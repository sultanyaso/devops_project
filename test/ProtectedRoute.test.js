// ProtectedRoute.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../Frontend/src/contexts/authContext';

// Mock useAuth hook
jest.mock('../Frontend/src/contexts/authContext', () => ({
  useAuth: () => ({
    user: null,
  }),
}));

test('redirects to landing page when no user is logged in', () => {
  render(
    <MemoryRouter initialEntries={['/student-dashboard']}>
      <Routes>
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <div>Student Dashboard</div>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<div>Landing Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Landing Page')).toBeInTheDocument();
});

test('renders children when user has allowed role', () => {
  jest.mock('./contexts/authContext', () => ({
    useAuth: () => ({
      user: { role: 'student' },
    }),
  }));

  render(
    <MemoryRouter initialEntries={['/student-dashboard']}>
      <Routes>
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <div>Student Dashboard</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Student Dashboard')).toBeInTheDocument();
});

test('redirects to user dashboard when role does not match', () => {
  jest.mock('./contexts/authContext', () => ({
    useAuth: () => ({
      user: { role: 'coach' },
    }),
  }));

  render(
    <MemoryRouter initialEntries={['/student-dashboard']}>
      <Routes>
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <div>Student Dashboard</div>
            </ProtectedRoute>
          }
        />
        <Route path="/coach-dashboard" element={<div>Coach Dashboard</div>} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Coach Dashboard')).toBeInTheDocument();
});