import React, { useState } from 'react';
import { useAuth } from '../contexts/auth/AuthContext';
import { Users, Shield, BarChart2, LogOut, Bell, Settings } from 'lucide-react';
import UserManagement from '../components/admin/UserManagement';
import ContentModeration from '../components/admin/ContentModeration';
import Analytics from '../components/admin/Analytics';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeModule, setActiveModule] = useState('analytics');

  const renderModule = () => {
    switch (activeModule) {
      case 'users':
        return <UserManagement />;
      case 'moderation':
        return <ContentModeration />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Analytics />;
    }
  };

  const modules = [
    { id: 'analytics', name: 'Analytics & Monitoring', icon: BarChart2 },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'moderation', name: 'Content Moderation', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={user} onLogout={logout} />
      
      <div className="flex">
        <AdminSidebar 
          modules={modules}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
        />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}