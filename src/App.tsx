import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BoltIcon, BookOpenIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { AppDispatch, RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { ArrowDownLeftIcon } from '@heroicons/react/24/solid';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden bg-blue-800 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">My Library</div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded bg-blue-700 hover:bg-blue-600"
          aria-label="Toggle Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 lg:z-auto bg-white text-black ${
          isCollapsed ? 'w-16' : 'w-64'
        } h-full transition-all duration-300 transform lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-200 flex justify-between items-center">
          {!isCollapsed && <span>My Library</span>}
          <button
            onClick={toggleCollapse}
            className="p-2 rounded hover:bg-gray-200"
            aria-label="Collapse Sidebar"
          >
            {isCollapsed ? (
              <ArrowRightIcon className="h-6 w-6" />
            ) : (
              <ArrowLeftIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block p-2 rounded text-sm md:text-base ${
                    isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center">
                  <BoltIcon className="h-6 w-6" />
                  {!isCollapsed && <span className="ml-2">Dashboard</span>}
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `block p-2 rounded text-sm md:text-base ${
                    isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center">
                  <BookOpenIcon className="h-6 w-6" />
                  {!isCollapsed && <span className="ml-2">Books</span>}
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Footer with Sign-Out Button */}
        <footer className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          {token && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-2 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none"
            >
              <ArrowDownLeftIcon className="h-6 w-6" />
              {!isCollapsed && <span className="ml-2">Sign Out</span>}
            </button>
          )}
        </footer>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          aria-hidden="true"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-blue-50">
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;