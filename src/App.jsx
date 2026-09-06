import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AuroraBackground from './components/Background/AuroraBackground';
import Navbar from './components/Navbar/Navbar';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Loader from './components/Loader/Loader';
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard, { AdminOverview } from './pages/admin/AdminDashboard';
import ProjectsManager from './pages/admin/ProjectsManager';
import CertificatesManager from './pages/admin/CertificatesManager';
import ProfileManager from './pages/admin/ProfileManager';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import { useLenis } from './hooks/useLenis';

function PublicSite() {
  useLenis();

  return (
    <>
      <AuroraBackground />
      <ScrollProgress />
      <Navbar />
      <Home />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Routes>
            <Route path="/" element={<PublicSite />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="certificates" element={<CertificatesManager />} />
              <Route path="profile" element={<ProfileManager />} />
            </Route>
          </Routes>
        </motion.div>
      )}
    </>
  );
}
