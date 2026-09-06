import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiFolder, FiAward, FiUser, FiLogOut } from 'react-icons/fi';
import './admin.scss';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell">
      <aside className="admin-shell__sidebar">
        <div className="admin-shell__logo">
          A<span className="mark">S.</span> Admin
        </div>
        <nav>
          <NavLink to="/admin/dashboard" end>
            <FiGrid /> Overview
          </NavLink>
          <NavLink to="/admin/dashboard/projects">
            <FiFolder /> Projects
          </NavLink>
          <NavLink to="/admin/dashboard/certificates">
            <FiAward /> Certificates
          </NavLink>
          <NavLink to="/admin/dashboard/profile">
            <FiUser /> Profile Photo
          </NavLink>
        </nav>
        <button className="admin-shell__logout" onClick={logout}>
          <FiLogOut /> Log out
        </button>
      </aside>

      <main className="admin-shell__main">
        <Outlet />
      </main>
    </div>
  );
}

export function AdminOverview() {
  return (
    <div className="card admin-overview">
      <h2>Welcome back</h2>
      <p>
        Use the sidebar to manage the projects and certificates shown on your public portfolio.
        Changes are saved directly to the database and reflect immediately for visitors.
      </p>
    </div>
  );
}
