import { createBrowserRouter } from 'react-router-dom'
import ApplyPage from './client/pages/ApplyPage'
import CheckoutPage from './client/pages/CheckoutPage'
import MyBookingsPage from './client/pages/MyBookingsPage'
import AdminDashboardPage from './admin/pages/AdminDashboardPage'
import ShadcnSchedulePage from './client/pages/schedule/ShadcnSchedulePage'
import StitchSchedulePage from './client/pages/schedule/StitchSchedulePage'
import ReactCalendarSchedulePage from './client/pages/schedule/ReactCalendarSchedulePage'

export const router = createBrowserRouter([
  { path: '/', element: <ApplyPage /> },
  { path: '/payment', element: <CheckoutPage /> },
  { path: '/my', element: <MyBookingsPage /> },
  { path: '/admin', element: <AdminDashboardPage /> },
  { path: '/schedule/shadcn', element: <ShadcnSchedulePage /> },
  { path: '/schedule/stitch', element: <StitchSchedulePage /> },
  { path: '/schedule/react', element: <ReactCalendarSchedulePage /> },
])
