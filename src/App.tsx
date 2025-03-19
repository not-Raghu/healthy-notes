import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Allergies from './pages/Allergies';
import Documents from './pages/Documents';
import Appointments from './pages/Appointments';
import MedicalHistory from './pages/MedicalHistory';
import Emergency from './pages/Emergency';
import FindHealthcare from './pages/FindHealthcare';
import AIAssistant from './pages/AIAssistant';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Activity, Bell, Menu, LogOut } from 'lucide-react';
import FloatingChatButton from './components/FloatingChatButton';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const AuthenticatedApp = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/login');
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm fixed w-full z-40">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <Activity className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-800">Healthy Notes</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right mr-2">
                <p className="text-sm font-medium text-gray-700">Welcome back,</p>
                <p className="text-sm text-gray-500">{user?.name}</p>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-6 h-6 text-gray-600" />
              </button>
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <span className="text-sm font-medium">{user?.initials}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                title="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <main className="pt-16 p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/allergies" element={<Allergies />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/medical-history" element={<MedicalHistory />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/map" element={<FindHealthcare />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>

        {/* Floating Chat Button */}
        <FloatingChatButton />
      </div>
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <AuthenticatedApp />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default App;