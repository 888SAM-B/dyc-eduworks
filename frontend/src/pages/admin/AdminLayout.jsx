import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Users, Settings, LayoutDashboard, LogOut } from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/developers', icon: Users, label: 'Developers' },
  { to: '/admin/services', icon: Settings, label: 'Services' },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-medium border-r border-light/5 flex flex-col shrink-0">
        <div className="p-6 border-b border-light/5">
          <div className="text-xl font-black tracking-tighter">
            <span className="text-teal">DYC</span><span className="text-light"> ADMIN</span>
          </div>
          <p className="text-light/30 text-xs mt-1 tracking-widest uppercase">Management Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-teal/10 text-teal border-l-2 border-teal'
                    : 'text-light/50 hover:text-light hover:bg-light/5 border-l-2 border-transparent'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-light/5">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-light/30 uppercase tracking-widest">Logged in as</p>
            <p className="text-sm font-bold text-light/70">{admin?.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/5 w-full transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
