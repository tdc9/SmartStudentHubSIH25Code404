import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Cookies from 'js-cookie';

const Sidebar = ({ isOpen = false, onClose, userRole = 'student', studentName = "Student" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    setActiveItem(location?.pathname);
  }, [location?.pathname]);

  const getNavigationItems = () => {
    const baseItems = [
      {
        label: 'Dashboard',
        path: userRole === 'student' ? '/student-dashboard' : '/institution-dashboard',
        icon: 'LayoutDashboard',
        badge: null
      }
    ];

    if (userRole === 'student') {
      return [
        ...baseItems,
        {
          label: 'Achievement Tracker',
          path: '/achievement-tracker',
          icon: 'Trophy',
          badge: '3'
        },
        {
          label: 'Student Portfolio',
          path: '/student-portfolio',
          icon: 'FileText',
          badge: null
        }
      ];
    } else if (userRole === 'institution') {
      return [
        ...baseItems,
        {
          label: 'Student Management',
          path: '/student-management',
          icon: 'Users',
          badge: '12'
        },
        {
          label: 'Reports',
          path: '/reports',
          icon: 'BarChart3',
          badge: null
        }
      ];
    } else if (userRole === 'government') {
      return [
        ...baseItems,
        {
          label: 'Institution Oversight',
          path: '/institution-oversight',
          icon: 'Building2',
          badge: '5'
        },
        {
          label: 'Compliance Reports',
          path: '/compliance-reports',
          icon: 'Shield',
          badge: null
        }
      ];
    }

    return baseItems;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setActiveItem(path);
    if (onClose) onClose();
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/");
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-card border-r border-border z-50 lg:z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        sidebar-shadow
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="var(--color-primary-foreground)" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground text-sm">Smart Student Hub</h1>
                <p className="text-xs text-muted-foreground capitalize">{userRole} Portal</p>
              </div>
            </div>
            
            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
              iconName="X"
              iconSize={20}
            >
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200 ease-out micro-interaction
                    ${activeItem === item?.path
                      ? 'bg-accent text-accent-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    color={activeItem === item?.path ? 'var(--color-accent-foreground)' : 'currentColor'}
                  />
                  <span className="flex-1 text-left">{item?.label}</span>
                  {item?.badge && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                      {item?.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Secondary Navigation */}
            <div className="mt-8 pt-4 border-t border-border">
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigation('/settings')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 ease-out micro-interaction"
                >
                  <Icon name="Settings" size={18} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => handleNavigation('/help')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 ease-out micro-interaction"
                >
                  <Icon name="HelpCircle" size={18} />
                  <span>Help & Support</span>
                </button>
              </div>
            </div>
          </nav>

          {/* User Info */}
          <div className="relative p-4 border-t border-border">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-primary-foreground)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{studentName}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {userRole === 'student' ? 'Student' : 'Administrator'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                iconName="MoreVertical"
                iconSize={16}
                className="shrink-0"
              >
                <span className="sr-only">User menu</span>
              </Button>
            </div>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute bottom-16 left-4 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-muted"
                >
                  <Icon name="User" size={16} />
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-muted text-red-600"
                >
                  <Icon name="LogOut" size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
